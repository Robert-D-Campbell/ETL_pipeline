exports.up = async function(knex) {
  await knex.schema.renameTable('shops_shop', 'shops');
  return knex.schema.table('shops', (table) => {
    table.uuid('region_id')
      .references('id')
      .inTable('regions_region')
      .onDelete('SET NULL');
    table.renameColumn('title', 'name');
    table.renameColumn('ccc1', 'exportCCC1');
    table.dropColumn('slug');
    table.dropColumn('customDiscount');
    table.dropColumn('permissions');
    table.dropColumn('updatedBy_id');
    table.dropColumn('oldId');
    table.dropColumn('lastInvoiceNo');
    table.dropColumn('discount');
  });
};
  
exports.down = async function (knex) {
};
  