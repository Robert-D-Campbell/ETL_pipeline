exports.up = async function(knex) {
  return knex.schema.table('invoices_invoicerow', (table) => {
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
};
        
exports.down = async function (knex) {
};
        