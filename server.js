const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
    res.render('pages/index');
})
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// app.get('*', (request, response) => response.status(404).send('This route does not exist'));
