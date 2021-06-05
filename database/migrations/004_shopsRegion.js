
exports.up = async function(knex) {
  const addRegionIdToShops = async () => {
    const shopIds = await knex
      .select('id')
      .from('shops_shop')
      .then(data => 
        data.map(datum => 
          datum.id
        ));
            
    console.log('SHOP IDS', shopIds);

    const shopsRegions = await knex
      .select('shop_id', 'region_id')
      .from('shops_shop_regions')
      .whereIn('shop_id', shopIds);
    console.log('SHOPS AND REGIONS', shopsRegions);
  
    // add region_id to shops
    shopIds.forEach(shopId => {
      shopsRegions.forEach(async data => {
        if (shopId === data.shop_id) {
          await knex('shops_shop')
            .where({id: data.shop_id})
            .update({
              region_id: data.region_id,
            });
        } else { 
          return;
        }
      });
    });
      
  };  
  await addRegionIdToShops();
};
    
exports.down = async function (knex) {
};
    