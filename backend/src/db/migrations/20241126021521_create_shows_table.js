/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("shows", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("name").notNullable();
        table.string("genre");
        table.text("summary");
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("shows");
};
