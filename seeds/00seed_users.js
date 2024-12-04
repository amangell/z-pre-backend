const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('users').del();

  const users = await Promise.all(
    Array.from({ length: 100 }, async () => {
      const plainPassword = faker.internet.password();
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      return {
        FirstName: faker.person.firstName(),
        LastName: faker.person.lastName(),
        Username: faker.internet.displayName(),
        Password: hashedPassword,
      };
    })
  ); await knex('users').insert(users);
};

