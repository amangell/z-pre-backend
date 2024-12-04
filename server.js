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

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await knex('users').where({ Id: id }).first();
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});


app.get('/items', async (req, res) => {
    try {
        const items = await knex('items')
            .join('users', 'items.UserId', '=', 'users.Id')
            .select('items.id', 'items.ItemName', 'items.Description', 'items.Quantity', 'users.FirstName', 'users.LastName');
        res.json(items);
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await knex('items').where({ id }).first();
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error fetching item details:', error);
        res.status(500).json({ error: 'Failed to fetch item details' });
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

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await knex('users').where({ Username: username, Password: password }).first();

    if (user) {
        res.json(user);
    } else {
        res.status(401).send('Invalid username or password');
    }
});

app.get('/users/:id/items', async (req, res) => {
    const userId = req.params.id;
    const items = await knex('items').where({ UserId: userId });
    res.json(items);
});

app.post('/items', async (req, res) => {
    const { UserId, ItemName, Description, Quantity } = req.body;

    if (!UserId || !ItemName || !Description || !Quantity) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        await knex('items').insert({
            UserId,
            ItemName,
            Description,
            Quantity,
        });
        res.status(201).json({ message: 'Item created successfully' });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
});

app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { ItemName, Description, Quantity } = req.body;
    if (!ItemName || !Description || !Quantity) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const updatedRows = await knex('items')
            .where({ id })
            .update({
                ItemName,
                Description,
                Quantity,
            });
        if (updatedRows) {
            res.status(200).json({ message: 'Item updated successfully' });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

app.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await knex('items').where({ id }).del();
        if (deletedRows) {
            res.status(200).json({ message: 'Item deleted successfully' });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
