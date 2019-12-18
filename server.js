'use strict';
const PORT = process.env.PORT || 3000;
const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));



function Book(bookData) {
  this.title = bookData.volumeInfo.title ? bookData.volumeInfo.title : 'No book title';
  this.image_Url = bookData.volumeInfo.imageLinks.thumbnail ? bookData.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://') : 'views/book-icon--icon-search-engine-6.png';
  this.author = bookData.volumeInfo.authors ? bookData.volumeInfo.authors : 'No authors';
  this.description = bookData.volumeInfo.description ? bookData.volumeInfo.description : 'N/A';
}


app.get('/', (req, res) => {
  res.render('pages/index');
})

app.post('/searches/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.search_criteria}+in${req.body.search_criteria}:${req.body.search}`).then(data => {
    let bookResult = [];
    for (let index = 0; index < 10; index++) {
      bookResult.push(new Book(data.body.items[index]));
    }
    let bookResultArr = bookResult.map(book => ({ image_url: book.image_Url, title: book.title, author: book.author, description: book.description }));
    res.render('pages/searches/show', {
      bookResultArr
    });

  }).catch(error => {
    console.log('This is the error:', error);
    res.render('pages/error', {
      message: error
    });
  })
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('*', (request, response) => response.status(404).send('This route does not exist'));
