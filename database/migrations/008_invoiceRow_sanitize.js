exports.up = async function(knex) {
  const sanitizeInvoiceRows = async () => {
    // delete invoice rows that have a null product_id
    await knex
      .select()
      .from('invoices_invoicerow')
      .where({product_id: null}).del();
    
    await knex
      .select()
      .from('invoices_invoicerow')
      .where({costPrice: null})
      .then(async data => {
        if (data) {
          data.forEach(async datum => {
            await knex('invoices_invoicerow')
              .where({id: datum.id})
              .update({costPrice: datum.listPrice * .607
              });
          });
        }
      }
      );

  };
  await sanitizeInvoiceRows();
};
exports.down = async function (knex) {
};