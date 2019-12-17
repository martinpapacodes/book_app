const express = require('express');
const superagent = require('superagent');
const ejs = require('ejs');
const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.static('./public'));
app.use(express.urlencoded( {extended:true} ));

app.set('view engine', 'ejs');



app.listen(PORT, () => console.log(`Listening on ${PORT}`));