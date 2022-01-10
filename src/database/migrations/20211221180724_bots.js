exports.up = function (knex) {
  return knex.schema.createTable("bots", (table) => {
    table.string("bot_id").primary();
    table.string("bot_name").notNullable();
    table.string("bot_description").notNullable();
    table.string("bot_avatar").notNullable();
    table.text("bot_changelog").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bots");
};