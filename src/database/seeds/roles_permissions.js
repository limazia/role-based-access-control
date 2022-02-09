exports.seed = function (knex) {
  return knex("roles_permissions")
    .del()
    .then(function () {
      return knex("roles_permissions").insert([
        {
          permission_id: "ff3b5d7cc9239",
          permission_description: "addUser" 
        },
        {
          permission_id: "59fb0fbd279ff",
          permission_description: "editUser" 
        },
        {
          permission_id: "a01bfd0c94c6d",
          permission_description: "deleteUser" 
        },
        {
          permission_id: "e3e17d2858b7d",
          permission_description: "deleteUser" 
        },
      ]);
    });
};