const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "[{<kiewbI>}]",
    database: "music_streaming"
});

con.connect();

router.get('/follows', (req, res) => {
    var sql = "SELECT id, following_artist_id, followed_artist_id, followed_at FROM follows WHERE unfollowed_at IS NULL";

    con.query(sql, (err, result) => {
        res.render('follows', {
            follows: result
        });
    });
});

// Artists
router.get('/artists', (req, res) => {
    var sql = "SELECT id, username FROM artists ORDER BY id";

    con.query(sql, (err, result) => {
        res.render('artists', {
            artists: result
        });
    });
});

// Create Artist
router.get('/artists/create-artist', (req, res) => {
    res.render('artists/create-read-update-artist', {
        action: "create-artist",
        artist: {
            username: "",
            picture: "",
            first_name: "",
            last_name: "",
            bio: ""
        },
        readonly: false
    });
});

router.post('/artists/create-artist', (req, res) => {
    const { username, picture, first_name, last_name, bio } = req.body;

    const sql = "INSERT INTO artists (username, picture, first_name, last_name, bio) VALUES (?, ?, ?, ?, ?)";

    con.query(sql, [username, picture, first_name, last_name, bio], (err, result) => {
        res.redirect('/artists');
    });
});

// Read Artist
router.get('/artists/read-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('artists/create-read-update-artist', { 
            action: "",
            artist: result[0],
            readonly: true
        });
    });
});

// Update Artist
router.get('/artists/update-artist/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('artists/create-read-update-artist', {
            action: `update-artist/${id}`,
            artist: result[0],
            readonly: false
        });
    });
});

router.post('/artists/update-artist/:id', (req, res) => {
    const id = req.params.id;

    const { username, picture, first_name, last_name, bio } = req.body;

    const sql = "UPDATE artists SET username = ?, picture = ?, first_name = ?, last_name = ?, bio = ? WHERE id = ?";

    con.query(sql, [username, picture, first_name, last_name, bio, id], (err, result) => {
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