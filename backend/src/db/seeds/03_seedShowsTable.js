/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("shows").insert(
    [
      {
        name: "The Mandalorian",
        genre: "Sci-Fi",
        summary: "A bounty hunter travels the galaxy protecting a young alien."
      },
      {
        name: "Breaking Bad",
        genre: "Drama",
        summary: "A teacher turns to cooking meth to secure his family's future."
      },
      {
        name: "Stranger Things",
        genre: "Sci-Fi",
        summary: "A group of kids uncover supernatural mysteries in their small town."
      },
      {
        name: "Friends",
        genre: "Comedy",
        summary: "A group of friends navigates love and life in New York City."
      },
      {
        name: "The Office",
        genre: "Comedy",
        summary: "A mockumentary about the daily lives of office employees."
      },
      {
        name: "The Crown",
        genre: "Drama",
        summary: "A historical drama following the reign of Queen Elizabeth II."
      },
      {
        name: "Sherlock",
        genre: "Crime",
        summary: "A modern take on Sherlock Holmes solving crimes in London."
      },
      {
        name: "Parks and Recreation",
        genre: "Comedy",
        summary: "The quirky employees of the Pawnee Parks and Recreation Department."
      },
      {
        name: "Black Mirror",
        genre: "Sci-Fi",
        summary: "A series exploring the dark side of technology and humanity."
      },
      {
        name: "The Witcher",
        genre: "Fantasy",
        summary: "A monster hunter grapples with his destiny in a dark, magical world."
      },
      {
        name: "House of Cards",
        genre: "Drama",
        summary: "A politician's ruthless climb to power in Washington, D.C."
      },
      {
        name: "The Boys",
        genre: "Action",
        summary: "A group of vigilantes take on corrupt superheroes and their company."
      },
      {
        name: "The Walking Dead",
        genre: "Horror",
        summary: "Survivors navigate a post-apocalyptic world overrun by zombies."
      },
      {
        name: "Succession",
        genre: "Drama",
        summary: "A wealthy family struggles for control of their media empire."
      },
      {
        name: "Better Call Saul",
        genre: "Drama",
        summary: "A prequel exploring the life of lawyer Jimmy McGill before Breaking Bad."
      },
      {
        name: "Westworld",
        genre: "Sci-Fi",
        summary: "A theme park populated by AI hosts becomes a battleground of rebellion."
      },
      {
        name: "Fargo",
        genre: "Crime",
        summary: "Anthology series of crimes in small-town America inspired by the Coen brothers' film."
      },
      {
        name: "Mad Men",
        genre: "Drama",
        summary: "The lives of employees in a 1960s advertising agency."
      },
      {
        name: "Peaky Blinders",
        genre: "Crime",
        summary: "A gangster family in 1920s Birmingham navigates crime and politics."
      },
      {
        name: "The Haunting of Hill House",
        genre: "Horror",
        summary: "A family confronts terrifying memories of their haunted childhood home."
      }
  ]);
};
