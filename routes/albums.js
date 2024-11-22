const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Co_Stephen01.",
    database: "music_streaming"
});

con.connect();

// Artists
router.get('/albums', (req, res) => {
    const sql = "SELECT id, title FROM albums ORDER BY id";

    con.query(sql, (err, result) => {
        res.render('albums', {
           albums: result
        });
    });
});

// Create Artist
router.get('/albums/create-album', (req, res) => {
    res.render('albums/create-read-update-albums', {
        action: "create-albums",
        albums: {
            title: "",
            album_cover: "",
            artist_id: "",
        },
        readonly: false
    });
});

router.post('/albums/create-album', (req, res) => {
    const { title, album_cover, artist_id } = req.body;

    const sql = "INSERT INTO albums (title, album_cover, artist_id) VALUES (?, ?, ?, ?, ?)";

    con.query(sql, [ title, album_cover, artist_id ], (err, result) => {
        res.redirect('/albums');
    });
});

// Read Artist
router.get('/albums/read-album/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM albums WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('albums/create-read-update-album', { 
            action: "",
            album: result[0],
            readonly: true
        });
    });
});

// Update Artist
router.get('/albums/update-album/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM albums WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('albums/create-read-update-album', {
            action: `update-album/${id}`,
            album: result[0],
            readonly: false
        });
    });
});

router.post('/albums/update-album/:id', (req, res) => {
    const id = req.params.id;

    const { title, album_cover, artist_id } = req.body;

    const sql = "UPDATE albums SET title = ?, album_cover = ?, artist_id = ? WHERE id = ?";

    con.query(sql, [title, album_cover, artist_id, id], (err, result) => {
        res.redirect('/albums');
    });
});

// Delete Artist
router.post('/albums/delete-album/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM albums WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.redirect('/albums');
    });
});

module.exports = router;