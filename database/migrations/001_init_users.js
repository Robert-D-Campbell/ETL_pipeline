exports.up = async function(knex) {
  await knex.schema.renameTable('users_tracsuser', 'users');
  return knex.schema.table('users', (table) => {
    table.uuid('region_id')
      .references('id')
      .inTable('regions_region')
      .onDelete('SET NULL');
    table.dropColumn('permissions');
    table.renameColumn('role', 'permissions');
    table.dropColumn('first_name');
    table.dropColumn('last_name');
    table.dropColumn('last_login');
    table.dropColumn('is_superuser');
    table.dropColumn('is_staff');
    table.dropColumn('is_active');
    table.dropColumn('isActive');
    table.dropColumn('date_joined');
    table.dropColumn('updatedBy_id');
    table.dropColumn('lastLogin');
    table.dropColumn('oldId');
    table.dropColumn('lastMailRequested');
    table.dropColumn('requested_role');
    table.dropColumn('banned');
    table.dropColumn('banReason');
    table.dropColumn('lastIp');
  });
};

exports.down = async function (knex) {
};
