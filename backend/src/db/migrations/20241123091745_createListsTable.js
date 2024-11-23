/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("lists", (table) => {
    table.increments("list_id").primary();
    table.integer("account_id").unsigned().notNullable(); 
    table 
        .foreign("account_id")
        .references("account_id")
        .inTable("accounts")
        .onDelete("CASCADE");
    table.text("title").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("lists");
};
