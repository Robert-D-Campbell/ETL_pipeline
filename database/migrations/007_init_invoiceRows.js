exports.up = async function(knex) {
  await knex.schema.renameTable('invoices_invoicerow', 'invoice_rows');
  await knex.schema.table('invoice_rows', (table) => {
    table.renameColumn('productList', 'listPrice');
    table.renameColumn('productCost', 'costPrice');
    table.renameColumn('productName', 'name');
    table.renameColumn('productDesc', 'description');
    table.dropColumn('productCost_currency');
    table.dropColumn('productList_currency');
    table.dropColumn('subtotal_currency');
    table.dropColumn('subtotal');
    table.dropColumn('permissions');
    table.dropColumn('updatedBy_id');
    table.dropColumn('oldId');
  });
  await knex.schema.alterTable('invoice_rows', async (table) => {
    table.decimal('listPrice', 16, 4).alter();
    table.decimal('costPrice', 16, 4).alter();
  });
};
        
exports.down = async function (knex) {
};
        