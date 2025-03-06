// Import required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Create the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Initialize the SQLite database (it will create the file if it doesn't exist)
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

// Endpoint to submit a review
app.post('/reviews', (req, res) => {
    const { name, rating, message } = req.body;

    // Check if all required fields are present
    if (!name || !rating || !message) {
        return res.status(400).json({ error: 'Name, rating, and message are required.' });
    }

    // Insert the review into the database
    db.run(
        `INSERT INTO reviews (name, rating, message) VALUES (?, ?, ?)`,
        [name, rating, message],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to save review.' });
            }
            res.status(200).json({ message: 'Review submitted successfully!' });
        }
    );
});

// Endpoint to get all reviews
app.get('/reviews', (req, res) => {
    db.all('SELECT * FROM reviews', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve reviews.' });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
