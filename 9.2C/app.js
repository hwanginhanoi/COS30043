const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { connection, insertUnits } = require('./database');
const units = require('./units.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    });
});

app.get('/api/units', (req, res) => {
    const sql = 'SELECT * FROM units';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/api/units', (req, res) => {
    const { code, description, cp, type } = req.body;
    const sql = 'INSERT INTO units (code, description, cp, type) VALUES (?, ?, ?, ?)';
    connection.query(sql, [code, description, cp, type], (err) => {
        if (err) throw err;
        res.send({ success: true });
    });
});

app.put('/api/units/:code', (req, res) => {
    const { code } = req.params;
    const { description, cp, type } = req.body;
    const sql = 'UPDATE units SET description = ?, cp = ?, type = ? WHERE code = ?';
    connection.query(sql, [description, cp, type, code], (err) => {
        if (err) throw err;
        res.send({ success: true });
    });
});

app.delete('/api/units/:code', (req, res) => {
    const { code } = req.params;
    const sql = 'DELETE FROM units WHERE code = ?';
    connection.query(sql, [code], (err) => {
        if (err) throw err;
        res.send({ success: true });
    });
});

// Route all other GET requests to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});