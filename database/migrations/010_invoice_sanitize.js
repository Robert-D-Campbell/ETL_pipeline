exports.up = async function(knex) {
  const sanitizeInvoices = async () => {

    const rowInvoices = await knex
      .select('invoice_id', 'listPrice', 'costPrice', 'qty')
      .from('invoices_invoicerow')
      .then(data => 
        data.map(datum => 
          datum
        ));
        
    const invoices = await knex
      .select('id', 'costPriceTotal', 'listPriceTotal')
      .from('invoices_invoice')
      .then(data => 
        data.map(datum => 
          datum
        ));


    invoices.forEach(invoice => {
      rowInvoices.forEach(async rowInvoice => {
        let costSubtotal = [];
        let listSubtotal = [];
        if (rowInvoice.invoice_id === invoice.id) {
          //map cost price * qty for subtotal
          costSubtotal.push(rowInvoice.costPrice * rowInvoice.qty);
          //map list price * qty for subtotal
          listSubtotal.push(rowInvoice.listPrice * rowInvoice.qty);
          //reduce cost price subtotals for invoice total
          const costTotal = costSubtotal.reduce((acc, curr) => Number(acc + curr), 0)
            .toFixed(2);
          console.log('OLD TOTAL COST', invoice.costPriceTotal);
          console.log('NEW TOTAL COST', costTotal);
          //reduce list price subtotals for invoice total
          const listTotal = listSubtotal.reduce((acc, curr) => Number(acc + curr), 0)
            .toFixed(2);
          console.log('OLD TOTAL LIST', invoice.listPriceTotal);
          console.log('NEW TOTAL LIST', listTotal);
          await knex('invoices_invoice').where({id: invoice.id}).update({
            costPriceTotal: costTotal,
            listPriceTotal: listTotal
          });
        }
      });
    });
  
  };
  await sanitizeInvoices();
};
exports.down = async function (knex) {
};