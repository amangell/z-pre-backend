
const { faker } = require('@faker-js/faker');

exports.seed = async function (knex) {
  await knex('items').del();

const items = Array.from({ length: 100 }, () => ({
    UserId: faker.number.int({ min: 1, max: 100 }),
    ItemName: faker.commerce.product(),
    Description: faker.commerce.productDescription(),
    Quantity: faker.number.int({ min: 1, max: 100 })
  }))

  await knex('items').insert(items)}