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

// TRACKS

router.get('/tracks', (req, res) => {
    const sql = "SELECT id, title FROM tracks ORDER BY id";

    con.query(sql, (err, result) => {
        res.render('tracks', {
            tracks: result
        });
    });
});

// CREATE TRACKS (GET)

router.get('/tracks/create', (req, res) => {
    con.query("SELECT * FROM genres", (err, genres) => {
        con.query("SELECT * FROM languages", (err, languages) => {
            con.query("SELECT * FROM albums", (err, albums) => {
                res.render('tracks-form', {
                    action: "create",
                    disabled: false,
                    track: {
                        title: "",
                        audio: "",
                        duration: "",
                        explicit: "",
                    },
                    genres: genres,
                    languages: languages,
                    albums: albums,
                });
            });
        });
    });
});

// CREATE TRACKS (POST)

router.post('/tracks/create', (req, res) => {
    const { title, audio, duration, explicit, genre, language, album } = req.body;

    const sql = "INSERT INTO tracks (title, audio, duration, explicit, genre_id, language_id, album_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    con.query(sql, [title, audio, duration, explicit, genre, language, album], (err, result) => {
        // console.log(err);
        res.redirect('/tracks');
    });
});

// READ TRACKS (GET)

router.get('/tracks/read/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM tracks WHERE id = ?";

    con.query("SELECT * FROM genres", (err, genres) => {
        con.query("SELECT * FROM languages", (err, languages) => {
            con.query("SELECT * FROM albums", (err, albums) => {
                con.query(sql, [id], (err, result) => {
                    res.render('tracks-form', { 
                        action: "read",
                        disabled: true,
                        track: result[0],
                        genres: genres,
                        languages: languages,
                        albums: albums
                    });
                });
            });
        });    
    });
});

// UPDATE TRACKS (GET)

router.get('/tracks/update/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM tracks WHERE id = ?";

    con.query("SELECT * FROM genres", (err, genres) => {
        con.query("SELECT * FROM languages", (err, languages) => {
            con.query("SELECT * FROM albums", (err, albums) => {
                con.query(sql, [id], (err, result) => {
                    res.render('tracks-form', {
                        action: `update/${id}`,
                        disabled: false,
                        track: result[0],
                        genres: genres,
                        languages: languages,
                        albums: albums
                    });
                });
            });
        });        
    });
});

// UPDATE TRACKS (POST)

router.post('/tracks/update/:id', (req, res) => {
    const { title, audio, duration, explicit, genre, language, album } = req.body;
    const id = req.params.id;

    const sql = "UPDATE tracks SET title = ?, audio = ?, duration = ?, explicit = ?, genre_id = ?, language_id = ?, album_id = ? WHERE id = ?";

    con.query(sql, [title, audio, duration, explicit, genre, language, album, id], (err, result) => {
        console.log(err);
        res.redirect('/tracks');
    });
});

// Tracks Report
router.get('/reports/tracks', (req, res) => {
    const { year, month } = req.query;

    const sql = `
        SELECT 
            t.id,
            t.title,
            COUNT(s.streaming_artist_id) AS streams
        FROM 
            tracks t
        LEFT JOIN 
            streams s ON s.streamed_track_id = t.id AND
            YEAR(s.streamed_at) <= ? AND
            MONTH(s.streamed_at) <= ?
        GROUP BY
            t.id
        ORDER BY 
            streams DESC;
    `

    con.query(sql, [year, month], (err, result) => {
        res.render('tracks-report', {
            tracks: result
        });
    });
});

// Export
module.exports = router;