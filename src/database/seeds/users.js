exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: "715501351e222",
          name: "Acacio de Lima",
          email: "limadeacacio@gmail.com",
          slug: "lima",
          avatar_url: "https://cdn.discordapp.com/avatars/317752484204380162/12bce24ce9937fd6b4385973da97a2c5.png",
          permissions: "view_users, edit_users, login_admin",
        }
      ]);
    });
};