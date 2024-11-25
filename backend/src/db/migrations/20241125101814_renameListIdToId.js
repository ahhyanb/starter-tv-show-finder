/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table("lists", (table) => {
      table.renameColumn("list_id", "id"); // Rename `list_id` to `id`
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.table("lists", (table) => {
      table.renameColumn("id", "list_id"); // Revert `id` back to `list_id`
    });
  };
  