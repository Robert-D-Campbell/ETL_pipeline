exports.up = async function(knex) {
  await knex.schema.dropTable('orders_order');
  await knex.schema.dropTable('django_admin_log');
  await knex.schema.dropTable('django_migrations');
  await knex.schema.dropTable('django_session');
  await knex.schema.dropTable('refresh_token_refreshtoken');
  await knex.schema.dropTable('shops_shop_regions');
  await knex.schema.dropTable('users_tracsuser_groups');
  await knex.schema.dropTable('users_tracsuser_regions');
  await knex.schema.dropTable('users_tracsuser_user_permissions');
  await knex.schema.dropTable('auth_group_permissions');
  await knex.schema.dropTable('auth_group');
  await knex.schema.dropTable('auth_permission');
  await knex.schema.dropTable('django_content_type');
};
            
exports.down = async function (knex) {
};