exports.up = function (knex) {
  return knex.schema.createTable("users_details", (table) => {
    table
      .string("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .primary();
    table.string("public_flags");
    table.string("flags");
    table.string("banner");
    table.string("banner_color");
    table.string("accent_color");
    table.string("locale");
    table.string("mfa_enabled");
    table.integer("premium_type").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_details");
};