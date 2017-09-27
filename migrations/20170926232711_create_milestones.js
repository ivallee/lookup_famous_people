
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', (table) => {
      table.increments('id');
      table.string('description');
      table.string('date_achieved');
    })
  ])
};;

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
    ])
};
