const express = require('express');
const knexConfig = require('./knexfile.js');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexConfig[environment]);
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
    try {
        const users = await knex('users').select('*');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to find users' });
    }
});

app.get('/items', async (req, res) => {
    try {
        const items = await knex('items').select('*');
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to find items' });
    }
});

app.post('/users', async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    try {
        await knex('users').insert({
            FirstName: firstName,
            LastName: lastName,
            Username: username,
            Password: password,
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
