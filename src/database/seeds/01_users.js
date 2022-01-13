exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: "cd4244141da8325",
          name: "Acacio de Lima",
          email: "limadeacacio@gmail.com",
          password: "$2b$10$FD3PLumsC59sjMp..vYL6.W8UIBjp5zEjXMUkXdq41UnQC6IXwIyG",
          avatar: "https://cdn.discordapp.com/avatars/317752484204380162/12bce24ce9937fd6b4385973da97a2c5.png"
        }
      ]);
    });
};