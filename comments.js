// Create web server
// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use bodyParser to parse JSON
app.use(bodyParser.json());

// Load data
const comments = require('./comments.json');

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a comment by ID
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find((comment) => comment.id === id);
    res.json(comment);
});

// Create a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

// Update a comment by ID
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const update = req.body;
    const comment = comments.find((comment) => comment.id === id);
    comment.name = update.name;
    comment.email = update.email;
    comment.body = update.body;
    res.json(comment);
});

// Delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex((comment) => comment.id === id);
    comments.splice(index, 1);
    res.json({ message: `Comment ${id} deleted` });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});