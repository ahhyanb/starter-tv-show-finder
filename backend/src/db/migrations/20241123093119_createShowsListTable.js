/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("shows_lists", (table) => {
    table.integer("show_id").unsigned().notNullable();
    table 
        .foreign("show_id")
        .references("show_id")
        .inTable("shows")
        .onDelete("CASCADE");
    table.integer("list_id").unsigned().notNullable();
    table
        .foreign("list_id")
        .references("list_id")
        .inTable("lists")
        .onDelete("CASCADE");
    table.primary(["show_id", "list_id"]);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("shows_lists");
  
};
