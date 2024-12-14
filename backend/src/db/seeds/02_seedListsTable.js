/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("lists").insert([
    { id: 1, account_id: 1, title: "Liam's Watchlist" },
    { id: 2, account_id: 1, title: "Liam's Favorites" },
    { id: 3, account_id: 2, title: "Rhiella's Comedy Shows" },
    { id: 4, account_id: 2, title: "Rhiella's Sci-Fi Picks" },
    { id: 5, account_id: 3, title: "Kian's Drama Collection" },
    { id: 6, account_id: 3, title: "Kian's Sci-Fi Picks" }, // Add the 6th list
  ]);
};
