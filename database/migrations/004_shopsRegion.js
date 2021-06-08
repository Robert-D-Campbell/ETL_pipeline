exports.up = async function(knex) {
  const addRegionIdToShops = async () => {
    const shopIds = await knex
      .select('id')
      .from('shops')
      .then(data => 
        data.map(datum => 
          datum.id
        ));
    const shopsRegions = await knex
      .select('shop_id', 'region_id')
      .from('shops_shop_regions')
      .whereIn('shop_id', shopIds);

    shopIds.forEach(shopId => {
      shopsRegions.forEach(async data => {
        if (shopId === data.shop_id) {
          await knex('shops')
            .where({id: data.shop_id})
            .update({
              region_id: data.region_id,
            });
        }
      });
    });
  };  
  await addRegionIdToShops();
};
exports.down = async function (knex) {
};
    