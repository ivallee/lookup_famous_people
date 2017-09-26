const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

const fname = process.argv[2];
const lname = process.argv[3];
const bday = process.argv[4];



knex.insert({
  first_name: fname,
  last_name: lname,
  birthdate: bday
}).into('famous_people').returning('id').asCallback(function (err, rows) {
  console.log('rows:', rows);
  knex.destroy();
});
