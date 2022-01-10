exports.seed = function (knex) {
  return knex("team")
    .del()
    .then(function () {
      return knex("team").insert([
        { user_id: "715501351e222", user_role: "ceo, backend" }
      ]);
    });
};