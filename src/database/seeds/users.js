exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: "cd4244141da8325",
          username: "Limazia",
          email: "teste@gmail.com",
          password: "$2b$10$i.afTQ/EvQvlXdoaqcvWc.qi2qRVi7cUXN9PFIOr535U9XU6ss33C", // password is 12
          permissions: "[]"
        }
      ]);
    });
};