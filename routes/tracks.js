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

// Export
module.exports = router;