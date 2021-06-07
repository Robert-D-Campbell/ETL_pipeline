exports.up = async function(knex) {
  return knex.schema.table('regions_region', (table) => {
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