/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("shows").insert([
    { 
      name: "Breaking Bad", 
      genre: "Drama", 
      summary: "A high school chemistry teacher turned methamphetamine producer." 
    },
    { 
      name: "Stranger Things", 
      genre: "Sci-Fi", 
      summary: "A group of kids uncover supernatural secrets in their small town." 
    },
    { 
      name: "The Office", 
      genre: "Comedy", 
      summary: "A mockumentary on a group of typical office workers." 
    },
    { 
      name: "Game of Thrones", 
      genre: "Fantasy", 
      summary: "Noble families vie for control of the Iron Throne." 
    },
  ]);
};
