exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          name: 'Samwise Gamgee',
          bio: 'Gardener and poet. Married to Rose Cotton',
        },
        {
          name: 'Frodo Baggins',
          bio: 'The ring bearer',
        },
        {
          name: 'Gandalf',
          bio: 'Old wizard',
        },
        {
          name: 'King #1 who got married',
          bio: 'Got married at the end of the third book',
        },
        {
          name: 'Queen #1 who got married',
          bio: 'Got married at the end of the third book',
        },
        {
          name: 'King #2 who got married',
          bio: 'Surprise marriage at the end of the third book',
        },
        {
          name: 'Queen #2 who got married',
          bio: 'Surprise marriage at the end of the third book',
        },
        {
          name: 'Wedding Guest #1',
          bio: 'Attended the double wedding',
        },
        {
          name: 'Wedding Guest #2',
          bio: 'Also attended the double wedding',
        },
      ]);
    });
};
