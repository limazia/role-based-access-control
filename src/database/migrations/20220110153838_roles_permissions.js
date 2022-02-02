exports.up = function (knex) {
  return knex.schema.createTable("roles_permissions", (table) => {
    table.string("permission_id").notNullable().primary();
    table.string("permission_description").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("roles_permissions");
};