const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const PORT = process.env.PORT || 3001;

const app = express();

function Book(title = ' ', url = 'google.com') {
  this.title = title;
  this.url = url.replace('http://', 'https://');

}

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.post('/searches/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.search_criteria}+in${req.body.search_criteria}:${req.body.search}`).then(data => {
    let bookResult = [];
    // console.log(data.body.items[0].selfLink)
    for (let index = 0; index < 10; index++) {
      // console.log(data.body.items[index].volumeInfo);
      bookResult.push(new Book(data.body.items[index].volumeInfo.title, data.body.items[index].selfLink));
    }
    let bookResultObj = bookResult.map(book => ({title: book.title, url: book.url}));
    console.log(bookResultObj);
    res.render('pages/searches/show', {
      books: bookResultObj
    });
  })
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('*', (request, response) => response.status(404).send('This route does not exist'));
