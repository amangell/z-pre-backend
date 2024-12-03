exports.seed = async function (knex) {
  await knex('items').del();

  await knex('items').insert([
      {
          UserId: 1,
          ItemName: 'Item',
          Description: 'an item',
          Quantity: 1,
      },
      {
          UserId: 2,
          ItemName: 'Surfboard',
          Description: 'a piece of foam, plastic or wood or a combination of such materials that can somewhat float',
          Quantity: 2,
      },
      {
          UserId: 3,
          ItemName: 'a lack of creativity',
          Description: 'i tried',
          Quantity: 5,
      },
      {
        UserId: 3,
        ItemName: 'of creativity',
        Description: 'i tried dwhuadhwiuadhoiaedao iwidhawi dbaiudheifneaodijd dhaiodhnanoaihdiue auhfoidoeucheaiuoh doianocaeiuh aoxnoaeucbaeiudha oniae uobaeiuheaonaei uchaeio',
        Quantity: 5,
    },
  ]);
};

