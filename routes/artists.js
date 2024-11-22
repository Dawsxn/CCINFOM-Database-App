// Express
const express = require('express');
const router = express.Router();

// MySQL
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "[{<kiewbI>}]",
    database: "music_streaming"
});
con.connect();

// Follows
router.get('/follows', (req, res) => {
    const sql = "SELECT id, following_artist_id, followed_artist_id, followed_at FROM follows WHERE unfollowed_at IS NULL";

    con.query(sql, (err, result) => {
        res.render('follows', {
            follows: result
        });
    });
});

// Reports
router.get('/reports', (req, res) => {
    res.render('reports');
});

// Follow Artist
router.get('/follows/follow', (req, res) => {
    const sql = "SELECT * FROM artists ORDER BY id";

    con.query(sql, (err, result) => {
        res.render('follows/follow', {
            action: "follow",
            artists: result
        });
    });
});

router.post('/follows/follow', (req, res) => {
    const { followed_artist_id, following_artist_id } = req.body;

    const sql = "INSERT INTO follows (followed_at, unfollowed_at, following_artist_id, followed_artist_id) VALUES (NOW(), NULL, ?, ?)";

    con.query(sql, [followed_artist_id, following_artist_id], (err, result) => {
        res.redirect('/follows');
    });
});

// Unfollow Artist
router.post('/follows/unfollow/:id', (req, res) => {
    const id = req.params.id;

    const sql = "UPDATE follows SET unfollowed_at = NOW() WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.redirect('/follows');
    });
});

// Artists
router.get('/artists', (req, res) => {
    const sql = "SELECT id, username FROM artists ORDER BY id";

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

// Export
module.exports = router;