exports.up = async function(knex) {
  const sanitizeInvoiceRows = async () => {
    // delete invoice rows that have a null product_id
    await knex
      .select()
      .from('invoice_rows')
      .where({product_id: null}).del();
    
    await knex
      .select()
      .from('invoice_rows')
      .where({costPrice: null})
      .then( data => {
        console.log('data', data.length);
        data.forEach(async datum => {
          await knex('invoice_rows')
            .where({id: datum.id})
            .update({costPrice: Number(datum.listPrice * 0.607).toFixed(2)
            });
        });
      }
      );

  };
  await sanitizeInvoiceRows();
};
exports.down = async function (knex) {
};