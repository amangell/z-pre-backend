exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('Id');
        table.string('FirstName').notNullable();
        table.string('LastName').notNullable();
        table.string('Username').notNullable();
        table.string('Password').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};