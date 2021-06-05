
exports.up = async function(knex) {
  const addRegionIdToUsers = async () => {
    const regionAdminIds = await knex('users_tracsuser')
      .where({permissions: 'REGION_ADMIN'})
      .select('id')
      .then(data => 
        data.map(datum => 
          datum.id
        ));

    const usersRegions = await knex
      .select('tracsuser_id', 'region_id')
      .from('users_tracsuser_regions')
      .whereIn('tracsuser_id', regionAdminIds);

    // add region_id to users WITH permissions = 'REGION_ADMIN'
    regionAdminIds.forEach(adminId => {
      usersRegions.forEach(async data => {
        if (adminId === data.tracsuser_id) {
          await knex('users_tracsuser')
            .where({id: data.tracsuser_id})
            .update({
              region_id: data.region_id,
            });
        } else { 
          return;
        }
      });
    });
    //remove shop_id from REGION_ADMIN
    regionAdminIds.forEach(async () => {
      await knex('users_tracsuser')
        .whereNotNull('shop_id')
        .update({
          shop_id: null,
        });
    });
    
  };  
  await addRegionIdToUsers();
};
  
exports.down = async function (knex) {
};
  