const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = {
  name: 'lookup-user',
  text: 'SELECT id, first_name, last_name, to_char(birthdate,\'YYYY/MM/DD\') AS birthdate FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1',
  values: process.argv.slice(2)
}

function printResult(result) {
    const person = result.rows[0];
    console.log(`Found ${result.rows.length} person(s) by the name '${query.values}':`);
    console.log(`- ${person.id}:, ${person.first_name} ${person.last_name}, born ${person.birthdate}`);
}

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }
  console.log('Searching...')
  client.query(query, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    printResult(result);
    client.end();
  });
});