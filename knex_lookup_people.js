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

const name = process.argv[2];

function padZero(number) {
  return number < 10 ? '0' + number.toString() : number;
}

function prettyPrintDate(someDate) {
  return `${someDate.getFullYear()}/${padZero(someDate.getMonth())}/${padZero(someDate.getDate())}`;
}

function printResult(person) {
  console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born ${prettyPrintDate(person.birthdate)}`);
}

knex.select('id', 'first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where('first_name', name)
  .orWhere('last_name', name)
  .asCallback((err, rows) => {
    console.log("Searching...");
    if (err) {
      return console.error(err);
    } else {
      console.log(`Found ${rows.length} person(s) by the name '${name}':`);
      rows.forEach(printResult);
    }
  }).finally(() => {
    knex.destroy();
  });