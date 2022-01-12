exports.seed = function (knex) {
  return knex("users_details")
    .del()
    .then(function () {
      return knex("users_details").insert([
        {
          user_id: "cd4244141da8325",
          permissions: "view_users, edit_users",
        }
      ]);
    });
};