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

// CREATE TRACKS

router.get('/tracks/create', (req, res) => {
    let genres;
    let languages;
    let albums;
    con.query("SELECT * FROM genres", (err, result) => {genres = result});
    con.query("SELECT * FROM languages", (err, result) => {languages = result});
    con.query("SELECT * FROM albums", (err, result) => {albums = result});
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
        albums: albums
    });
});

// Export
module.exports = router;