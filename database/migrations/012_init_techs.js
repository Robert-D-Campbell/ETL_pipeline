exports.up = async function(knex) {
  await knex.schema.renameTable('techs_tech', 'techs');
  return knex.schema.table('techs', (table) => {
    table.dropColumn('permissions');
    table.dropColumn('updatedBy_id');
    table.dropColumn('oldId');
  });
};
          
exports.down = async function (knex) {
};