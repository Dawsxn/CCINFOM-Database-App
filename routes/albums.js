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

// Export
module.exports = router;