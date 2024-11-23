/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function (knex) {
  // Inserts seed entries
  await knex("lists").insert([
    { account_id: 1, title: "Liam's Watchlist" },
    { account_id: 1, title: "Liam's Favorites" },
    { account_id: 2, title: "Rhiella's Comedy Shows" },
    { account_id: 3, title: "Kian's Drama Collection" },
    { account_id: 3, title: "Kian's Sci-Fi Picks" },
  ]);
};
