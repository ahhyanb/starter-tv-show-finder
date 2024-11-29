/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("lists", (table) => {
        table.increments("id").primary();
        table.integer("account_id").unsigned().notNullable()
            .references("id")
            .inTable("accounts")
            .onDelete("CASCADE");
        table.text("title").notNullable();
        
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("lists");
  
};
