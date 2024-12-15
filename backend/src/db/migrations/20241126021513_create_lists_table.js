/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("lists", (table) => {
      table.increments("id").primary(); // Auto-incrementing primary key
      table.integer("account_id").unsigned().notNullable()
        .references("id")
        .inTable("accounts")
        .onDelete("CASCADE"); // Cascade delete when account is deleted
      table.text("title").notNullable(); // List title
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("lists");
  };
  