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
router.get('/artists/create', (req, res) => {
    res.render('artists-form', {
        action: "create",
        disabled: false,
        artist: {
            username: "",
            picture: "",
            first_name: "",
            last_name: "",
            bio: ""
        }
    });
});

router.post('/artists/create', (req, res) => {
    const { username, picture, first_name, last_name, bio } = req.body;

    const sql = "INSERT INTO artists (username, picture, first_name, last_name, bio) VALUES (?, ?, ?, ?, ?)";

    con.query(sql, [username, picture, first_name, last_name, bio], (err, result) => {
        res.redirect('/artists');
    });
});

// Read Artist
router.get('/artists/read/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('artists-form', { 
            action: "read",
            disabled: true,
            artist: result[0]
        });
    });
});

// Update Artist
router.get('/artists/update/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.render('artists-form', {
            action: `update-artist/${id}`,
            disabled: false,
            artist: result[0]
        });
    });
});

router.post('/artists/update-artist/:id', (req, res) => {
    const { username, picture, first_name, last_name, bio } = req.body;
    const id = req.params.id;

    const sql = "UPDATE artists SET username = ?, picture = ?, first_name = ?, last_name = ?, bio = ? WHERE id = ?";

    con.query(sql, [username, picture, first_name, last_name, bio, id], (err, result) => {
        res.redirect('/artists');
    });
});

// Delete Artist
router.post('/artists/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM artists WHERE id = ?";

    con.query(sql, [id], (err, result) => {
        res.redirect('/artists');
    });
});

// Follows
router.get('/follows', (req, res) => {
    const selected = req.query.select;

    const sql = "SELECT id, username FROM artists ORDER BY id"

    con.query(sql, (err, result) => {
        const options = result;

        const sql = "SELECT a.id, a.username FROM artists a JOIN follows f ON a.id = f.followed_artist_id WHERE f.following_artist_id = ? AND f.unfollowed_at IS NULL ORDER BY a.id";
        
        con.query(sql, [selected], (err, result) => {
            const following = result;

            const sql = "SELECT a.id, a.username FROM artists a LEFT JOIN follows f ON a.id = f.followed_artist_id AND f.following_artist_id = ? AND f.unfollowed_at is NULL WHERE f.id IS NULL AND a.id != ? ORDER BY a.id";

            con.query(sql, [selected, selected], (err, result) => {
                res.render('follows', {
                    id: selected,
                    options: options,
                    following: following,
                    recommended: result
                });
            });
        });
    });
});

// Follow Artist
router.post('/follows/follow/:following_id/:followed_id', (req, res) => {
    const following_id = req.params.following_id;
    const followed_id = req.params.followed_id;

    const sql = "INSERT INTO follows (followed_at, unfollowed_at, following_artist_id, followed_artist_id) VALUES (NOW(), NULL, ?, ?)"

    con.query(sql, [following_id, followed_id], (err, result) => {
        res.redirect(`/follows/?select=${following_id}`);
    });
});

// Unfollow Artist
router.post('/follows/unfollow/:following_id/:followed_id', (req, res) => {
    const following_id = req.params.following_id;
    const followed_id = req.params.followed_id;

    const sql = "UPDATE follows SET unfollowed_at = NOW() WHERE following_artist_id = ? AND followed_artist_id = ? AND unfollowed_at IS NULL";

    con.query(sql, [following_id, followed_id], (err, result) => {
        res.redirect(`/follows/?select=${following_id}`);
    });
});

// Report
router.get('/reports', (req, res) => {
    res.render('reports');
});

// Export
module.exports = router;