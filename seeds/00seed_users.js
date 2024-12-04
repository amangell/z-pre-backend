const { faker } = require('@faker-js/faker');

exports.seed = async function (knex) {
  await knex('users').del();

const users = Array.from({ length: 100 }, () => ({
    FirstName: faker.person.firstName(),
    LastName: faker.person.lastName(),
    Username: faker.internet.displayName(),
    Password: faker.internet.password()
  }))

  await knex('users').insert(users)}
