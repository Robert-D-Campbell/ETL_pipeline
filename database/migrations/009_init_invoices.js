exports.up = async function(knex) {
  return knex.schema.table('invoices_invoice', (table) => {
    // table.float('costPriceTotal');
    // table.float('ccc1InvoiceId');
    // table.renameColumn('invoiceNo', 'invoiceNumber');
    // table.renameColumn('ro', 'roNumber');
    // table.renameColumn('total', 'listPriceTotal');
    // table.renameColumn('user_id', 'createdFor_id');
    // table.renameColumn('ccc1', 'ccc1Exported');
    // table.dropColumn('status');
    // table.dropColumn('permissions');
    // table.dropColumn('updatedBy_id');
    // table.dropColumn('total_currency');
  });
};
      
exports.down = async function (knex) {
};