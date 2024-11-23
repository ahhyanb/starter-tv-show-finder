/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("accounts", (table) => {
    table.increments("account_id").primary();
    table.text("name").notNullable();
    table.text("username").notNullable();
  })
    

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("accounts");
  
};
