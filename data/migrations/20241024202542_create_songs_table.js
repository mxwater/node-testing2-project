exports.up = function(knex) {
  return knex.schema.createTable('songs', (table) => {
    table.increments('id'); 
    table.string('title').notNullable();
    table.string('artist').notNullable();
    table.integer('duration').notNullable(); 
    table.timestamps(true, true); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('songs');
};
