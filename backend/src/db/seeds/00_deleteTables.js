/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shows_lists").del();
  await knex("shows").del();
  await knex("lists").del();
  await knex("accounts").del();
};
