exports.seed = function (knex) {
  return knex("roles")
    .del()
    .then(function () {
      return knex("roles").insert([
        {
          role_id: "342f72069b295",
          role_name: "Developer",
          role_class: "badge-role dev",
          role_permissions: "edit_name, delete_room",
        }
      ]);
    });
};