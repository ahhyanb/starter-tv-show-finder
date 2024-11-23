/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("accounts").insert([
    { name: "Liam Kenzo", username: "liamkenzo" },
    { name: "Rhiella Kate", username: "rhiellakate" },
    { name: "Kian Ryder", username: "kianryder" },
  ]);
};
