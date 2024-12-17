const knex = require("../db/connection");

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

async function update(listId, updatedList) {
  await knex("lists").where({ id: listId }).update(updatedList); // Perform the update
  // console.log("Updated List:", updatedList);
  return readId(listId); // Fetch the updated list with associated shows
}



function destroy(listId) {
  return knex("lists").where({ id: listId }).del();
}

module.exports = {
  list,
  create,
  readId,
  update,
  destroy,
};
