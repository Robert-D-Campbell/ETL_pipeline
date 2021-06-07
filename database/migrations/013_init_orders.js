exports.up = function (knex) {
  return knex
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema.createTable('orders', (table) => {
      table
        .uuid('id')
        .notNullable()
        .primary()
        .unique()
        .defaultTo(knex.raw('uuid_generate_v4()'));
  
      table
        .enu('status', ['SUBMITTED', 'PROCESSING'])
        .defaultTo('SUBMITTED');
  
      table.uuid('shop_id');
      table.uuid('createdBy_id');
  
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    }));
};
  
exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
  