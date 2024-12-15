/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("shows", (table) => {
      table.increments("id").primary(); // Auto-incrementing primary key
      table.text("name").notNullable(); // Show name
      table.text("genre"); // Genre of the show
      table.text("summary"); // Brief summary of the show
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("shows");
  };
  