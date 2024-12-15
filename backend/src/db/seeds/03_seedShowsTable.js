/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("shows").insert([
    { id: 1, name: "The Mandalorian", genre: "Sci-Fi", summary: "A bounty hunter travels the galaxy protecting a young alien." },
    { id: 2, name: "Breaking Bad", genre: "Drama", summary: "A teacher turns to cooking meth to secure his family's future." },
    { id: 3, name: "Stranger Things", genre: "Sci-Fi", summary: "A group of kids uncover supernatural mysteries in their small town." },
    { id: 4, name: "Friends", genre: "Comedy", summary: "A group of friends navigates love and life in New York City." },
    { id: 5, name: "The Office", genre: "Comedy", summary: "A mockumentary about the daily lives of office employees." },
    { id: 6, name: "The Crown", genre: "Drama", summary: "A historical drama following the reign of Queen Elizabeth II." },
    { id: 7, name: "Sherlock", genre: "Crime", summary: "A modern take on Sherlock Holmes solving crimes in London." },
    { id: 8, name: "Parks and Recreation", genre: "Comedy", summary: "The quirky employees of the Pawnee Parks and Recreation Department." },
    { id: 9, name: "Black Mirror", genre: "Sci-Fi", summary: "A series exploring the dark side of technology and humanity." },
    { id: 10, name: "The Witcher", genre: "Fantasy", summary: "A monster hunter grapples with his destiny in a dark, magical world." },
    { id: 11, name: "House of Cards", genre: "Drama", summary: "A politician's ruthless climb to power in Washington, D.C." },
    { id: 12, name: "The Boys", genre: "Action", summary: "A group of vigilantes take on corrupt superheroes and their company." },
  ]);
};
