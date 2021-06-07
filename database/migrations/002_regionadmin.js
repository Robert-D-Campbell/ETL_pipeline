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
    regionAdminIds.forEach(adminId => {
      usersRegions.forEach(async data => {
        if (adminId === data.tracsuser_id) {
          await knex('users_tracsuser')
            .where({id: data.tracsuser_id})
            .update({
              region_id: data.region_id,
            });
        }
      });
    });
    regionAdminIds.forEach(async () => {
      await knex('users_tracsuser')
        .whereNotNull('shop_id')
        .andWhere({
          permissions: 'REGION_ADMIN'
        })
        .update({
          shop_id: null,
        });
    });
  };  
  await addRegionIdToUsers();
};
exports.down = async function (knex) {
};
  