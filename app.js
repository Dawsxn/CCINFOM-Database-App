// Express
const express = require('express');
const app = express();
app.use(express.urlencoded({ 
    extended: true 
}));

// EJS
app.set('view engine', 'ejs');

// Artists, Albums, Tracks
const artists = require('./routes/artists');
const albums = require('./routes/albums');
const tracks = require('./routes/tracks');
app.use('/', artists);
app.use('/', albums);
app.use('/', tracks);

// Index
app.get('/', (req, res) => {
    res.render('index')
});

// Reports
app.get('/reports', (req, res) => {
    res.render('reports');
});

// Server
app.listen(3000, console.log(`http://localhost:3000`));