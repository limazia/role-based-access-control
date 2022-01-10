exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.string("id").primary().unique().notNullable();
    table.string("username").notNullable();
    table.string("discriminator").notNullable();
    table.string("avatar");
    table.string("permissions").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
