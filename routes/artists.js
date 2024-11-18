const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "[{<kiewbI>}]",
    database: "music_streaming"
});

con.connect(err => {
    if (err) throw err;
});

// Artists
router.get('/artists', (req, res) => {
    var sql = "SELECT id, username FROM artists ORDER BY id";

    con.query(sql, (err, result) => {
        res.render('artists', { artists: result });
    });
});

// Create Artist
router.get('/artists/create-artist', (req, res) => {
    res.render('artists/create-artist');
});

router.post('/artists/create-artist', (req, res) => {
    const { username, email, created_at, first_name, last_name, bio } = req.body;

    const sql = "INSERT INTO artists (username, email, created_at, first_name, last_name, bio) VALUES (?, ?, ?, ?, ?, ?)";

    con.query(sql, [username, email, created_at, first_name, last_name, bio], (err, result) => {
        res.redirect('/artists');
    });
});

// Read Artist
router.get('/artists/read-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('artists/read-artist', { id: id, artist: result[0] });
    });
});

// Update Artist
router.get('/artists/update-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('artists/update-artist', {
            id: id,
            artist: result[0]
        });
    });
});

router.post('/artists/update-artist/:id', (req, res) => {
    const id = req.params.id;
    const { username, email, created_at, first_name, last_name, bio } = req.body;

    const sql = "UPDATE artists SET username = ?, email = ?, created_at = ?, first_name = ?, last_name = ?, bio = ? WHERE id = ?";

    con.query(sql, [username, email, created_at, first_name, last_name, bio, id], (err, result) => {
        res.redirect('/artists');
    });
});

// Delete Artist
router.post('/artists/delete-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.redirect('/artists');
    });
});

module.exports = router;