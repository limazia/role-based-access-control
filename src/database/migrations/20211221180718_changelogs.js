exports.up = function (knex) {
  return knex.schema.createTable("changelogs", (table) => {
    table.string("changelog_id").primary();
    table.string("changelog_title").notNullable();
    table.text("changelog_content").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.timestamp("createdAt").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("changelogs");
};