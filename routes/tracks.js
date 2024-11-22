const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

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

module.exports = router;