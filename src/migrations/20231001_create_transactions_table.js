exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.string('type').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.string('status').notNullable();
      table.timestamps(true, true);
      table.foreign('user_id').references('users.id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  };