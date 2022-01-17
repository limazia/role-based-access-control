exports.seed = function (knex) {
  return knex("rooms")
    .del()
    .then(function () {
      return knex("rooms").insert([
        {
          room_id: "649ebe0468ac6",
          room_title: "Teste",
          room_name: "teste",
          room_private: 1,
        }
      ]);
    });
};