exports.up = async function(knex) {
  await knex('users').update({password: '$2a$10$AXt7nauWrFxkhgXjr7FGnuwKjFN1de6DoJm7fpSEqb9eIDmdZ1T.y'});
};
            
exports.down = async function (knex) {
};