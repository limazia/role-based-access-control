exports.seed = function (knex) {
  return knex("users_details")
    .del()
    .then(function () {
      return knex("users_details").insert([
        {
          user_id: "cd4244141da8325",
          avatar: "http://localhost:3000/cdn/avatar1.jpg",
        },
        {
          user_id: "e23ff5c62c4c756",
          avatar: "http://localhost:3000/cdn/avatar4.jpg",
        }
      ]);
    });
};