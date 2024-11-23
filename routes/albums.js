const express = require('express');
const mysql = require('mysql2');

const router = express.Router();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "[{<kiewbI>}]",
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

    con.query("SELECT id, username FROM artists", (err, option_ids) => {
        res.render('albums-form', {
            action: "create",
            disabled: false,
            albums: {
                title: "",
                album_cover: "",
                
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
router.get('/albums/read/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM albums WHERE id = ?";

    con.query("SELECT id, username FROM artists", (err, option_ids) => {
        con.query(sql, [id], (err, result) => {
            res.render('albums-form', { 
                action: "",
                disabled: true,
                albums: result[0],
                option_ids: option_ids,
            });
            
        });
       
    });
});

// Update Album
router.get('/albums/update/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM albums WHERE id = ?";

    con.query("SELECT id, username FROM artists", [id], (err, option_ids) => {
        con.query(sql, [id], (err, result) => {
            res.render('albums-form', {
                action: `update/${id}`,
                disabled: false,
                albums: result[0],
                option_ids: option_ids
                
            });
        });
    });
});


router.post('/albums/update/:id', (req, res) => {
    const id = req.params.id;

    const { title, album_cover, artist_id } = req.body;

    const sql = "UPDATE albums SET title = ?, album_cover = ?, artist_id = ? WHERE id = ?";

    con.query(sql, [title, album_cover, artist_id, id], (err, result) => {
        res.redirect('/albums');
    });
});

// Delete Album
router.post('/albums/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM albums WHERE id = ?";
    
    con.query(sql, [id], (err, result) => {
        res.redirect('/albums');
    });
});

// Likes
router.get('/likes', (req, res) => {
    const selected = req.query.select;

    const sql = "SELECT id, username FROM artists ORDER BY id"

    con.query(sql, (err, result) => {
        const options = result;

        const sql = "SELECT a.id, a.title FROM albums a JOIN likes l ON a.id = l.liked_album_id WHERE l.liking_artist_id = ? AND l.unliked_at IS NULL ORDER BY a.id";
        
        con.query(sql, [selected], (err, result) => {
            const liking = result;

            const sql = "SELECT a.id, a.title FROM albums a LEFT JOIN likes l ON a.id = l.liked_album_id AND l.liking_artist_id = ? AND l.unliked_at is NULL WHERE l.id IS NULL AND a.id != ? ORDER BY a.id";

            con.query(sql, [selected, selected], (err, result) => {
                res.render('likes', {
                    id: selected,
                    options: options,
                    liking: liking,
                    recommended: result
                });
            });
        });
    });
});

// Like album
router.post('/likes/like/:liking_artist_id/:liked_album_id', (req, res) => {
    const liking_id = req.params.liking_artist_id;
    const liked_id = req.params.liked_album_id;

    const sql = "INSERT INTO likes (liked_at, unliked_at, liking_artist_id, liked_album_id) VALUES (NOW(), NULL, ?, ?)"

    con.query(sql, [liking_id, liked_id], (err, result) => {
        res.redirect(`/likes/?select=${liking_id}`);
    });
});

// Unlike album
router.post('/likes/unlike/:liking_artist_id/:liked_album_id', (req, res) => {
    const liking_id = req.params.liking_artist_id;
    const liked_id = req.params.liked_album_id;

    const sql = "UPDATE likes SET unliked_at = NOW() WHERE liking_artist_id = ? AND liked_album_id = ? AND unliked_at IS NULL";

    con.query(sql, [liking_id, liked_id], (err, result) => {
        res.redirect(`/likes/?select=${liking_id}`);
    });
});

// Albums Report
router.get('/reports/albums', (req, res) => {
    const { year, month } = req.query;

    const sql = `
        SELECT 
            al.id,
            al.title,
            COUNT(DISTINCT l.liking_artist_id) AS likes
        FROM 
            albums al
        LEFT JOIN 
            likes l ON l.liked_album_id = al.id AND
            YEAR(l.liked_at) <= ? AND
            MONTH(l.liked_at) <= ? AND
            ((YEAR(l.unliked_at) > ? AND MONTH(l.unliked_at) > ?) OR l.unliked_at IS NULL) 
        GROUP BY
            al.id
        ORDER BY 
            likes DESC;
    `

    con.query(sql, [year, month, year, month], (err, result) => {
        res.render('albums-report', {
            albums: result,
            month: month,
            year: year
        });
    });
});

module.exports = router;

