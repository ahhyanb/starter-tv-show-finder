/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("shows_lists", (table) => {
    table.integer("list_id").unsigned().notNullable()
      .references("id")
      .inTable("lists")
      .onDelete("CASCADE"); // Cascade delete when a list is deleted
    table.integer("show_id").unsigned().notNullable()
      .references("id")
      .inTable("shows")
      .onDelete("CASCADE"); // Cascade delete when a show is deleted
    table.primary(["list_id", "show_id"]); // Composite primary key
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("shows_lists");
};
