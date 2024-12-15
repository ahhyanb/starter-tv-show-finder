/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("accounts", (table) => {
    table.increments("id").primary(); // Auto-incrementing primary key
    table.text("name").notNullable(); // Account holder's name
    table.text("username").notNullable().unique(); // Unique username
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("accounts");
};
