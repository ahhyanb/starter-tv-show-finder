const knex = require("../db/connection");
const axios = require("axios");

function fetchListData(filter = {}) {
  return knex("lists")
    .leftJoin("shows_lists", "lists.id", "shows_lists.list_id")
    .leftJoin("shows", "shows_lists.show_id", "shows.id")
    .select(
      "lists.id as list_id",
      "lists.title as list_title",
      "lists.account_id",
      "shows.id as show_id",
      "shows.name as show_name",
      "shows.genre",
      "shows.summary"
    )
    .where(filter) // Ensure this applies correctly
    .then((rows) => {
      // console.log("Rows fetched in fetchListData:", rows); // Debug logging
      return rows;
    });
}

function processRowsToSingleList(rows) {
  if (!rows.length) return null;

  const list = {
    id: rows[0].list_id,
    title: rows[0].list_title,
    account_id: rows[0].account_id,
    shows: rows
      .filter((row) => row.show_id !== null) // Exclude rows with null show_id
      .map((row) => ({
        id: row.show_id,
        name: row.show_name,
        genre: row.genre,
        summary: row.summary,
      })),
  };

  // console.log("Processed List:", list);

  return list;
}


function list() {
  return fetchListData().then((rows) =>
    rows.reduce((acc, row) => {
      let list = acc.find((l) => l.id === row.list_id);
      if (!list) {
        list = {
          id: row.list_id,
          title: row.list_title,
          account_id: row.account_id,
          shows: [],
        };
        acc.push(list);
      }
      if (row.show_id) {
        list.shows.push({
          id: row.show_id,
          name: row.show_name,
          genre: row.genre,
          summary: row.summary,
        });
      }
      return acc;
    }, [])
  );
}

function readId(listId) {
  return fetchListData({ "lists.id": listId }).then(processRowsToSingleList);
}


function create(newList) {
  return knex("lists")
    .insert(newList)
    .returning("*")
    .then((rows) => rows[0]);
}

async function update(listId, updatedFields) {
  const existingList = await knex("lists").where({ id: listId }).first();

  if (!existingList) {
    throw new Error(`List with ID ${listId} not found.`);
  }

  // Merge existing fields with updated fields
  const updatedList = { ...existingList, ...updatedFields };

  await knex("lists").where({ id: listId }).update(updatedList);

  return readId(listId); // Return the updated list
}


function destroy(listId) {
  return knex("lists").where({ id: listId }).del();
}


async function addShowToList(listId, showId) {
  // Step 1: Check if the show exists in the `shows` table
  const existingShow = await knex("shows").where({ id: showId }).first();

  if (!existingShow) {
    // Step 2: Fetch show details from the external API
    const apiResponse = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
    const showData = apiResponse.data;

    // Step 3: Extract relevant fields to match your `shows` table schema
    const newShow = {
      id: showData.id,
      name: showData.name,
      genre: showData.genres.join(", "),
      summary: showData.summary,
    };

    // Step 4: Insert the new show into the `shows` table
    await knex("shows").insert(newShow);
  }

  // Step 5: Add the show to the `shows_lists` table
  return knex("shows_lists")
    .insert({ list_id: listId, show_id: showId })
    .returning("*")
    .then((rows) => rows[0]);
}


function isShowInList(listId, showId) {
  return knex("shows_lists")
    .where({ list_id: listId, show_id: showId })
    .first(); // Return the existing list if it exists 
}

function removeShowFromList(listId, showId) {
  return knex("shows_lists") // Adjust to your actual table name
    .where({ list_id: listId, show_id: showId })
    .del(); // No need for .returning() unless you want specific values
}



module.exports = {
  list,
  create,
  readId,
  update,
  destroy,
  addShowToList,
  isShowInList,
  removeShowFromList,
};
