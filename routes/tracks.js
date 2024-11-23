// Express
const express = require('express');
const router = express.Router();

// MySQL
const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysqlpw",
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

// DELETE TRACKS

router.post('/tracks/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM tracks WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.redirect('/tracks');
    });
});

// STREAMS (GET)

router.get('/streams', (req, res) => {
    const selected = req.query.select;

    const sql = "SELECT id, username FROM artists ORDER BY id";

    con.query(sql, (err, options) => {
        if (!selected) {
            // If no artist is selected, send an empty array for tracks and counts
            return res.render('streams', {
                id: selected,
                options: options,
                tracks: [],
                counts: {}
            });
        }

        // If an artist is selected, fetch the tracks and counts
        const sql = "SELECT * FROM tracks";
        con.query(sql, [selected], (err, tracks) => {
            const sql = "SELECT streamed_track_id, COUNT(*) AS streamcount FROM streams GROUP BY streamed_track_id";
            con.query(sql, (err, countsResults) => {
                
                const counts = {};
                countsResults.forEach(row => {
                    counts[row.streamed_track_id] = row.streamcount;
                });

                res.render('streams', {
                    id: selected,
                    options: options,
                    tracks: tracks,
                    counts: counts
                });
            });
        });
    });
});


// STREAMS (POST)

router.post('/streams/stream/:streaming_id/:streamed_id', (req, res) => {
    const streaming_id = req.params.streaming_id;
    const streamed_id = req.params.streamed_id;

    const sql = "INSERT INTO streams (streaming_artist_id, streamed_track_id, streamed_at) VALUES (?, ?, NOW())"

    con.query(sql, [streaming_id, streamed_id], (err, result) => {
        res.redirect(`/streams/?select=${streaming_id}`);
    });
});


// TRACKS REPORTS
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