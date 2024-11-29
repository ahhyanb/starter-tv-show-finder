/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Insert seed data
  await knex("shows_lists").insert([
    // User One's Favorites
    { list_id: 1, show_id: 1 },
    { list_id: 1, show_id: 2 },
    { list_id: 1, show_id: 3 },

    // User Two's Watch Later
    { list_id: 2, show_id: 4 },
    { list_id: 2, show_id: 5 },
    { list_id: 2, show_id: 6 },

    // User Three's Completed
    { list_id: 3, show_id: 7 },
    { list_id: 3, show_id: 8 },
    { list_id: 3, show_id: 9 },

    // Additional shows for variety
    { list_id: 1, show_id: 10 },
    { list_id: 2, show_id: 11 },
    { list_id: 3, show_id: 12 },
  ]);
};
