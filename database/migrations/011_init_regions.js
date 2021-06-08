exports.up = async function(knex) {
  await knex.schema.renameTable('regions_region', 'regions');
  return knex.schema.table('regions', (table) => {
    table.renameColumn('title', 'name');
    table.renameColumn('regionType', 'type');
    table.dropColumn('slug');
    table.dropColumn('permissions');
    table.dropColumn('updatedBy_id');
    table.dropColumn('oldId');
  });
};
        
exports.down = async function (knex) {
};