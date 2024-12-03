exports.up = function (knex) {
    return knex.schema.createTable('items', (table) => {
      table.increments('id');
      table.integer('UserId').notNullable();
      table.string('ItemName').notNullable();
      table.string('Description').notNullable();
      table.integer('Quantity').notNullable();
      table.foreign('UserId').references('Id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');});
  };
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('items');
  };
  
