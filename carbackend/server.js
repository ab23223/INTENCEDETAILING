// Import required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app
const app = express();
const port = 3000;

// Enable CORS for all origins or specify the frontend domain
app.use(cors({
    origin: 'https://shiny-space-capybara-v6g7g44j5gxvcxj6g-8080.app.github.dev', // Your frontend domain
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a table for reviews if it doesn't exist
const db = new sqlite3.Database('reviews.db', (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create a table for reviews if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        message TEXT NOT NULL
    );
`);

// Handle GET request for reviews
app.get('/reviews', (req, res) => {
    const sql = 'SELECT * FROM reviews';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Handle POST request to submit a review
app.post('/reviews', (req, res) => {
    const { name, rating, message } = req.body;
    const sql = 'INSERT INTO reviews (name, rating, message) VALUES (?, ?, ?)';
    db.run(sql, [name, rating, message], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, rating, message });
    });
});

// Preflight OPTIONS request handler for CORS
app.options('/reviews', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://shiny-space-capybara-v6g7g44j5gxvcxj6g-8080.app.github.dev'); // Frontend domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
