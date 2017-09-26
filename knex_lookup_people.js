const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const name = process.argv[2];

knex.column('id', 'first_name', 'last_name', knex.raw('to_char(birthdate,\'YYYY/MM/DD\') as birthdate'))
    // .column(knex.raw('to_char(birthdate) as birthdate'))
    .from('famous_people')
    .where('first_name', name)
    .orWhere('last_name', name)
    .asCallback((err, rows) => {
  if (err) {
    return console.error(err);
  }
  console.log("Searching...")
  const person = rows[0];
  console.log(`Found ${rows.length} person(s) by the name '${name}':`);
  console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`);

}).finally(() => {
  knex.destroy();
});