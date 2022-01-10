exports.up = function (knex) {
  return knex.schema.createTable("rooms", (table) => {
    table.string("room_id").primary().unique().notNullable();
    table.string("room_name").notNullable();
    table.string("room_description").notNullable();
    table.string("room_room", 0).notNullable();
    table.string("room_photo");

    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rooms");
};
