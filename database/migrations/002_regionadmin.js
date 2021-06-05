
exports.up = async function(knex) {
  const addRegionsToUsers = async () => {
    const regionAdmins = await knex('users_tracsuser')
      .where({permissions: 'REGION_ADMIN'})
      .select('id')
      .then(data => 
        data.map(datum => 
          datum.id
        ));

    const usersRegions = await knex
      .select('tracsuser_id', 'region_id')
      .from('users_tracsuser_regions')
      .whereIn('tracsuser_id', regionAdmins);

    // add region_id to users WITH permissions = 'REGION_ADMIN'
    regionAdmins.forEach(admin => {
      usersRegions.forEach(async data => {
        if (admin === data.tracsuser_id) {
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
    regionAdmins.forEach(async admin => {
      await knex('users_tracsuser')
        .whereNotNull('shop_id')
        .update({
          shop_id: null,
        });
    });
    
  };  
  await addRegionsToUsers();
};
  
exports.down = async function (knex) {
};
  