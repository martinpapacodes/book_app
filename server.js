const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const PORT = process.env.PORT || 3001;

const app = express();

function Book(title = ',', author = '', description = '', url) {
  this.title = title;
  this.title = author;
  this.description = description;
  this.url = "https" + url.substring(4);

}

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.post('/searches/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.search_criteria}+in${req.body.search_criteria}:${req.body.search}`).then(data => {
    console.log(data.text.items);
    for (let index = 0; index < 10; index++) {
      let topTenSearchResults = new Book(data.text.items[index].volumeInfo.title)
    }
  })
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('*', (request, response) => response.status(404).send('This route does not exist'));
