var express = require('express');
var mysql = require('mysql2');

const host = "localhost";
const user = "root";
const password = "[{<kiewbI>}]";
const database = "music_streaming";
const port = 3000

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

con.connect(err => {
    if (err) throw err;
});

// Dashboard
app.get('/', (req, res) => {
    res.render('index');
});

// Artists
app.get('/artists', (req, res) => {
    var sql = "SELECT id, username FROM artists ORDER BY id";

    con.query(sql, (err, result) => {
        res.render('artists', { artists: result})
    });
});

// Create Artist
app.get('/create-artist', (req, res) => {
    res.render('create-artist');
});

app.post('/create-artist', (req, res) => {
    const {username, email, created_at, first_name, last_name, bio} = req.body;

    const sql = "INSERT INTO artists (username, email, created_at, first_name, last_name, bio) VALUES (?, ?, ?, ?, ?, ?)";

    con.query(sql, [username, email, created_at, first_name, last_name, bio], (err, result) => {
        if (err) throw err;

        res.redirect('/artists');
    });
});

// Read Artist
app.get('/read-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('read-artist', { artist: result[0]})
    });
})

// Update Artist
app.get('/update-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('update-artist', { artist: result[0]})
    });
})

app.post('/update-artist/:id', (req, res) => {
    const id = req.params.id;
    const { username, email, created_at, first_name, last_name, bio } = req.body;

    const sql = "UPDATE artists SET username = ?, email = ?, created_at = ?, first_name = ?, last_name = ?, bio = ? WHERE id = ?";

    con.query(sql, [username, email, created_at, first_name, last_name, bio, id], (err, result) => {
        res.redirect('/artists');
    });
});

// Delete Artist
app.post('/delete-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.redirect('/artists');
    });
});

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
})