exports.up = function (knex) {
  return knex.schema.createTable("rooms_messages", (table) => {
    table
      .string("id_room")
      .notNullable()
      .references("room_id")
      .inTable("rooms")
      .onDelete("CASCADE")
      .primary();
    table.string("room_message").notNullable();
    table.string("room_author").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rooms_messages");
};