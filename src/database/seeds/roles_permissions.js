exports.seed = function (knex) {
  return knex("roles_permissions")
    .del()
    .then(function () {
      return knex("roles_permissions").insert([
        {
          permission_id: "54ff36245acfd",
          permission_description: "addUser" 
        },
        {
          permission_id: "54ff36245acfd",
          permission_description: "editUser" 
        },
        {
          permission_id: "51a76feff6687",
          permission_description: "deleteUser" 
        },
        {
          permission_id: "17b8faf587cfc",
          permission_description: "deleteUser" 
        },
      ]);
    });
};