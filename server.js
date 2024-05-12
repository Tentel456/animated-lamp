const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize player balances
let playerBalances = {};

// Routes
app.get('/balance/:player', (req, res) => {
    const player = req.params.player;
    const balance = playerBalances[player] || 0;
    res.send(`Balance of ${player}: ${balance}`);
});

app.post('/balance/:player/:amount', (req, res) => {
    const player = req.params.player;
    const amount = parseInt(req.params.amount);
    const currentBalance = playerBalances[player] || 0;
    playerBalances[player] = currentBalance + amount;
    res.send(`Updated balance of ${player} to ${playerBalances[player]}`);
});

// Save player balances to a file
app.get('/save', (req, res) => {
    fs.writeFile('playerBalances.json', JSON.stringify(playerBalances), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to save player balances');
        } else {
            res.send('Player balances saved successfully');
        }
    });
});

// Load player balances from a file
app.get('/load', (req, res) => {
    fs.readFile('playerBalances.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to load player balances');
        } else {
            playerBalances = JSON.parse(data);
            res.send('Player balances loaded successfully');
        }
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
