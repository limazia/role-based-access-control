exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: "cd4244141da8325",
          username: "Acacio de Lima",
          email: "limadeacacio@gmail.com",
          password: "$2b$10$RORbU4GFCKgp8Q53Kcxt4.5yTAJQVzntKqkAYA.SI49M9zhh9d7BS",
          discriminator: 2406
        },
        {
          id: "cd4244141da8325",
          username: "João Menezes",
          email: "joaomenezes@gmail.com",
          password: "$2b$10$RORbU4GFCKgp8Q53Kcxt4.5yTAJQVzntKqkAYA.SI49M9zhh9d7BS",
          discriminator: 2230
        }
      ]);
    });
};