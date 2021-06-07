exports.up = async function(knex) {
  return knex.schema.table('techs_tech', (table) => {
    table.dropColumn('permissions');
    table.dropColumn('updatedBy_id');
    table.dropColumn('oldId');
  });
};
          
exports.down = async function (knex) {
};