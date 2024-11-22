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

// Albums
router.get('/albums', (req, res) => {
    const sql = "SELECT id, title FROM albums ORDER BY id";    
 
    con.query(sql, (err, result) => {
        res.render('albums', {
           albums: result,
        });

    });
});

// Create Album
router.get('/albums/create', (req, res) => {
    const { title, album_cover, artist_id }= {
        title: "",
        album_cover: "",
        artist_id: ""
    };

    con.query("SELECT * FROM albums", (err, option_ids) => {
        res.render('albums-form', {
            action: "create-albums",
            disabled: false,
            albums: {
                title: "",
                album_cover: "",
                artist_id: ""
            },
            option_ids: option_ids,
        });
    });
});

router.post('/albums/create', (req, res) => {
    const { title, album_cover, artist_id } = req.body;

    const sql = "INSERT INTO albums (title, album_cover, artist_id) VALUES (?, ?, ?)";

    con.query(sql, [ title, album_cover, artist_id ], (err, result) => {
        res.redirect('/albums');
    });
});

// Read Album
router.get('/albums/read-album/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM albums WHERE id = ?";

    con.query("SELECT * FROM albums", (err, option_ids) => {
        con.query(sql, [id], (err, result) => {
            res.render('albums-form', { 
                action: "",
                disabled: false,
                albums: result[0],
                readonly: true,
                option_ids: option_ids,
            });
            
        });
       
    });
});

// Update Album
router.get('/albums/update-album/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM albums WHERE id = ?";
    con.query("SELECT * FROM albums", (err, option_ids) => {
        con.query(sql, [id], (err, result) => {
            res.render('albums-form', {
                action: `update-album/${id}`,
                disabled: false,
                albums: result[0],
                readonly: false,
                option_ids: option_ids,
            });
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

// Delete Album
router.post('/albums/delete-album/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM albums WHERE id = ?";
    
    con.query(sql, [id], (err, result) => {
        res.redirect('/albums');
    });
});

// Likes
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

// Like album
router.post('/follows/follow/:following_id/:followed_id', (req, res) => {
    const following_id = req.params.following_id;
    const followed_id = req.params.followed_id;

    const sql = "INSERT INTO follows (followed_at, unfollowed_at, following_artist_id, followed_artist_id) VALUES (NOW(), NULL, ?, ?)"

    con.query(sql, [following_id, followed_id], (err, result) => {
        res.redirect(`/follows/?select=${following_id}`);
    });
});

// Unlike album
router.post('/follows/unfollow/:following_id/:followed_id', (req, res) => {
    const following_id = req.params.following_id;
    const followed_id = req.params.followed_id;

    const sql = "UPDATE follows SET unfollowed_at = NOW() WHERE following_artist_id = ? AND followed_artist_id = ? AND unfollowed_at IS NULL";

    con.query(sql, [following_id, followed_id], (err, result) => {
        res.redirect(`/follows/?select=${following_id}`);
    });
});

module.exports = router;

