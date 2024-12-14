const knex = require("../db/connection");


// Fetch raw data with joins
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
    .where(filter);
}

// Process raw rows into nested data
function processRowsToLists(rows) {
  const lists = [];
  rows.forEach(row => {
    let list = lists.find(l => l.id === row.list_id);
    if (!list) {
      list = {
        id: row.list_id,
        title: row.list_title,
        account_id: row.account_id,
        shows: [],
      };
      lists.push(list);
    }

    if (row.show_id) {
      list.shows.push({
        id: row.show_id,
        name: row.show_name,
        genre: row.genre,
        summary: row.summary,
      });
    }
  });
  return lists;
}

// Process rows into a single list
function processRowsToSingleList(rows) {
  if (!rows.length) return null;

  return {
    id: rows[0].list_id,
    title: rows[0].list_title,
    account_id: rows[0].account_id,
    shows: rows
      .filter(row => row.show_id) // Exclude rows without shows
      .map(row => ({
        id: row.show_id,
        name: row.show_name,
        genre: row.genre,
        summary: row.summary,
      })),
  };
}

// Get all lists
function list() {
  return fetchListData()
    .then(processRowsToLists);
}

// Get a specific list by ID
function readId(listId) {
  return fetchListData({ "lists.id": listId })
    .then(processRowsToSingleList);
}

// Create a new list
function create(newList) {
  return knex("lists")
    .insert(newList)
    .returning("*")
    .then(rows => rows[0]); // Return the inserted row
}


function update(listId, updatedList) {
  return knex("lists")
    .where({ id: listId })
    .update(updatedList)
    .returning("*")
    .then(rows => rows[0]); // Return the updated row
}

function destroy(listId) {
  return knex("lists")
    .where({ id: listId })
    .del();
}

module.exports = {
  list,
  create,
  readId,
  update,
  destroy,
};
