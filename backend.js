const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Mock database
const reviews = [];

app.post('/reviews', (req, res) => {
    const { name, rating, message } = req.body;
    if (name && rating && message) {
        // Save the review to the "database" (mocked here with an array)
        reviews.push({ name, rating, message });
        res.status(200).json({ message: 'Review saved successfully!' });
    } else {
        res.status(400).json({ message: 'Missing data' });
    }
});

app.get('/reviews', (req, res) => {
    res.json(reviews);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
