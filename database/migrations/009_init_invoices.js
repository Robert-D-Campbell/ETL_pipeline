exports.up = async function(knex) {
  await knex.schema.renameTable('invoices_invoice', 'invoices');
  await knex.schema.table('invoices', (table) => {
    table.float('ccc1InvoiceId');
    table.renameColumn('invoiceNo', 'invoiceNumber');
    table.renameColumn('ro', 'roNumber');
    table.renameColumn('total', 'listPriceTotal');
    table.renameColumn('user_id', 'createdFor_id');
    table.renameColumn('ccc1', 'ccc1Exported');
    table.dropColumn('status');
    table.dropColumn('oldId');
    table.dropColumn('permissions');
    table.dropColumn('updatedBy_id');
    table.dropColumn('total_currency');
  });
  await knex.schema.alterTable('invoices', async (table) => {
    table.decimal('costPriceTotal', 16, 4);
    table.decimal('listPriceTotal', 16, 4).alter();
  });
};
      
exports.down = async function (knex) {
};