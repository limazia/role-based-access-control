exports.up = function (knex) {
  return knex.schema.createTable("roles", (table) => {
    table.string("role_id").notNullable().primary();
    table.string("role_name");
    table.string("role_class");
    table.string("role_permissions", "[]").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("roles");
};