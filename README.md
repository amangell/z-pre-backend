Welcome to the API for my Z-Prefix CRUD Project

Before you get started, make sure you have all dependencies installed (pg knex express cors @faker-js/faker bcrypt)
Also, be sure to create a new .env with your postgres database connection details

use npx knex migrate:latest && npx knex seed:run once database is connected

use node server.js to run the server

summary of routes:
/users - GET, POST
/users/:id - GET
/users/:id/items - GET
/items - GET, POST
/items/:id - GET, PUT, DELETE
/signin - POST