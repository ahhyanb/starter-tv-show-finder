/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table("accounts", (table) => {
      table.renameColumn("account_id", "id"); // Rename account_id to id
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.table("accounts", (table) => {
      table.renameColumn("id", "account_id"); // Revert back to account_id
    });
  };
  