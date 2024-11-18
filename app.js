const express = require('express');
const mysql = require('mysql2');
const artists = require('./routes/artists');

const host = "localhost";
const user = "root";
const password = "mysqlpw";
const database = "music_streaming";
const port = 3000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', artists);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});