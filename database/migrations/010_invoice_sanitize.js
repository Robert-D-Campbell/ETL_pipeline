exports.up = async function(knex) {
  const sanitizeInvoices = async () => {
    const rowInvoices = await knex
      .select('invoice_id', 'listPrice', 'costPrice', 'qty')
      .from('invoice_rows')
      .then(data => 
        data.map(datum => 
          datum
        ));
    // console.log('ROW INVOICES', rowInvoices);
        
    const invoices = await knex
      .select('id', 'costPriceTotal', 'listPriceTotal')
      .from('invoices')
      .then(data => 
        data.map(datum => 
          datum
        ));
    // console.log('INVOICES', invoices);

    invoices.forEach( invoice => {
      rowInvoices.forEach( async rowInvoice => {
        let costSubtotal = [];
        let listSubtotal = [];
        if (rowInvoice.invoice_id === invoice.id) {
          costSubtotal.push(rowInvoice.costPrice * rowInvoice.qty);
          listSubtotal.push(rowInvoice.listPrice * rowInvoice.qty);

          const costTotal = costSubtotal.reduce((acc, curr) => Number(acc + curr, 0))
            .toFixed(2);
            
          const listTotal = listSubtotal.reduce((acc, curr) => Number(acc + curr, 0))
            .toFixed(2);
          await knex('invoices').where({id: rowInvoice.invoice_id}).update({
            costPriceTotal: costTotal,
            listPriceTotal: listTotal
          });
          console.log(`TOTAL COST of ${invoice.id} is ${costTotal}`);
          console.log(`TOTAL LIST of ${invoice.id} is ${listTotal}`);
        }
      });
    });
  };
  await sanitizeInvoices();
};
exports.down = async function (knex) {
};