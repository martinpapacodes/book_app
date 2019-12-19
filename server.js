'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const pg = require('pg');
const ejs = require('ejs');
const superagent = require('superagent');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));
client.connect();



function Book(bookData) {
  this.title = bookData.volumeInfo.title ? bookData.volumeInfo.title : 'No book title';
  this.image_Url = bookData.volumeInfo.imageLinks.thumbnail ? bookData.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://') : 'views/book-icon--icon-search-engine-6.png';
  this.author = bookData.volumeInfo.authors ? bookData.volumeInfo.authors : 'No authors';
  this.isbn = bookData.volumeInfo.industryIdentifiers[0].type + bookData.volumeInfo.industryIdentifiers[0].identifier ? bookData.volumeInfo.industryIdentifiers[0].type + bookData.volumeInfo.industryIdentifiers[0].identifier : 'N/A'
  this.description = bookData.volumeInfo.description ? bookData.volumeInfo.description : 'N/A';
}

//Routes
app.get('/', showBooksFromDB);
app.get('/searches/new', (newReq, newRes) => newRes.render('pages/searches/new'));
app.post('/searches/show', showGoogleAPIResults);
app.get('/books/:id', requestforOneBook);
app.post('/books', addBookToDB);

//Route Error
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

function showBooksFromDB(request, response) {
  const instruction = 'SELECT * from books;';
  client.query(instruction).then(sqlRes => {
    const bookArr = sqlRes.rows;
    bookArr.length > 0 ? response.render('pages/index', { bookArr: bookArr, totalrow: sqlRes.rowCount }) : response.render('pages/index');
  }).catch(e => errorHandler(e, response));
}

function showGoogleAPIResults(request, response) {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=in${request.body.search_criteria}:${request.body.search}`).then(data => {
    let bookResult = [];
    for (let index = 0; index < 10; index++) {
      bookResult.push(new Book(data.body.items[index]));
    }
    let bookResultArr = bookResult.map(book => ({ image_url: book.image_Url, title: book.title, author: book.author, description: book.description, isbn: book.isbn }));
    response.render('pages/searches/show', {
      bookResultArr
    });

  }).catch(e => errorHandler(e, response));
}

function requestforOneBook(request, response) {
  const instruction = 'SELECT * from books WHERE id = $1;';
  const value = [request.params.id]
  client.query(instruction, value).then(sqlRes => {
    const book = sqlRes.rows;
    book.length > 0 ? response.render('pages/books/show', { book: book[0] }) : response.render('pages/books/show');
  }).catch(e => errorHandler(e, response));
}

function addBookToDB(request, response) {
  const instruction = `INSERT INTO
  books (
    author,
    title,
    isbn,
    image_url,
    description,
    bookshelf
  )
VALUES
  ( $1, $2, $3, $4, $5, $6) RETURNING id;`;
  const values = [request.body.author, request.body.title, request.body.isbn, request.body.image_url, request.body.description, request.body.bookshelf];
  client.query(instruction, values).then(sqlRes => {
    response.redirect(`/books/${sqlRes.rows[0].id}`)
  }).catch(e => errorHandler(e, response));
}

function errorHandler(error, response) {
  response.render('pages/error', {
    message: error
  });
}

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

