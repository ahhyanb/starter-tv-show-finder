/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("accounts").insert([
    { id: 1, name: "Liam Kenzo", username: "liamkenzo" },
    { id: 2, name: "Rhiella Kate", username: "rhiellakate" },
    { id: 3, name: "Kian Ryder", username: "kianryder" },
  ]);
};
