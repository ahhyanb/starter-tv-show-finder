/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("shows_lists", (table) => {
      table.dropForeign("list_id"); // Drop the old foreign key
      table.foreign("list_id").references("id").inTable("lists").onDelete("CASCADE"); // Add the updated foreign key
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.table("shows_lists", (table) => {
      table.dropForeign("list_id"); // Drop the updated foreign key
      table.foreign("list_id").references("list_id").inTable("lists").onDelete("CASCADE"); // Restore the original foreign key
    });
  };
  