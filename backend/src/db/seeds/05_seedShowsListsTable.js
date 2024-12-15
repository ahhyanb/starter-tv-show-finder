/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("shows_lists").insert([
    // Liam's Watchlist
    { list_id: 1, show_id: 1 },
    { list_id: 1, show_id: 2 },

    // Liam's Favorites
    { list_id: 2, show_id: 3 },
    { list_id: 2, show_id: 4 },

    // Rhiella's Comedy Shows
    { list_id: 3, show_id: 5 },
    { list_id: 3, show_id: 6 },

    // Rhiella's Sci-Fi Picks
    { list_id: 4, show_id: 7 },
    { list_id: 4, show_id: 8 },

    // Kian's Drama Collection
    { list_id: 5, show_id: 9 },
    { list_id: 5, show_id: 10 },

    // Kian's Sci-Fi Picks
    { list_id: 6, show_id: 11 },
    { list_id: 6, show_id: 12 },
  ]);
};
