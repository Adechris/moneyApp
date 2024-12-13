exports.up = function(knex) {
    return knex.schema.createTable('bank_accounts', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.string('account_number').notNullable();
      table.decimal('balance', 10, 2).defaultTo(0);
      table.timestamps(true, true);
      table.foreign('user_id').references('users.id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('bank_accounts');
  };