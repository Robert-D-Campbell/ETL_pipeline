exports.up = async function(knex) {
  await knex.schema.renameTable('products_product', 'products');
  return knex.schema.table('products', (table) => {
    table.renameColumn('ownerType', 'type');
    table.renameColumn('cost', 'costPrice');
    table.dropColumn('cost_currency');
    table.dropColumn('listPrice_currency');
    table.dropColumn('status');
    table.dropColumn('permissions');
    table.dropColumn('updatedBy_id');
    table.dropColumn('productType');
    table.dropColumn('oldId');
    table.dropColumn('region_id');
  });
};
    
exports.down = async function (knex) {
};
    