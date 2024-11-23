/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Inserts seed entries
  await knex("shows_lists").insert([
    { show_id: 1, list_id: 1 }, // Show 1 in Liam's Watchlist
    { show_id: 2, list_id: 1 }, // Show 2 in Liam's Watchlist
    { show_id: 3, list_id: 2 }, // Show 3 in Liam's Favorites
    { show_id: 4, list_id: 3 }, // Show 4 in Rhiella's Comedy Shows
    { show_id: 1, list_id: 4 }, // Show 1 in Kian's Drama Collection
    { show_id: 2, list_id: 5 }, // Show 2 in Kian's Sci-Fi Picks
  ]);
};
