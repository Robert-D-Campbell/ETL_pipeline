exports.up = async function(knex) {
  const sanitizeProducts = async () => {
    await knex
      .select()
      .from('products')
      .where({type: 'SYSTEM'})
      .update({
        type: 'GLOBAL',
      });
    const oldProductIds = await knex
      .select()
      .from('products')
      .whereNot({
        type: 'GLOBAL'
      }).andWhere('createdAt', '<', '2021-03-02' )
      .then(data => 
        data.map(datum => 
          datum.id
        )
      );
    await knex
      .select()
      .from('invoices_invoicerow')
      .whereIn('product_id', oldProductIds)
      .del();
    await knex
      .select()
      .from('products')
      .whereIn('id', oldProductIds)
      .del();
  };
  await sanitizeProducts();
};
exports.down = async function (knex) {
};