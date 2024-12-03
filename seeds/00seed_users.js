exports.seed = async function (knex) {
  await knex('users').del();

  await knex('users').insert([
      {
          FirstName: 'Beeftonius',
          LastName: 'Hamburger',
          Username: 'beeft0nius',
          Password: 'password',
      },
      {
          FirstName: 'George',
          LastName: 'Lopez',
          Username: 'george',
          Password: 'password2',
      },
      {
          FirstName: 'Mario',
          LastName: 'Mario',
          Username: 'test',
          Password: 'longerpassword',
      },
  ]);
};

