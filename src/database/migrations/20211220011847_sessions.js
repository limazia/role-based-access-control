exports.up = function (knex) {
  return knex.schema.createTable("sessions", (table) => {
    table.string("session_id").primary();
    table.string("session_data").notNullable();
    table.date("expiresAt").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sessions");
};