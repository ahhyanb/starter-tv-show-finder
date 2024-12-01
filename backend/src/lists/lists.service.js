const knex = require("../db/connection");

function list() {
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
      .then(rows => {
        // Transform rows into grouped structure
        const lists = [];
        
        rows.forEach(row => {
          // Find or create the list
          let list = lists.find(l => l.id === row.list_id);
          if (!list) {
            list = {
              id: row.list_id,
              title: row.list_title,
              account_id: row.account_id,
              shows: []
            };
            lists.push(list);
          }
  
          // Add show information if it exists
          if (row.show_id) {
            list.shows.push({
              id: row.show_id,
              name: row.show_name,
              genre: row.genre,
              summary: row.summary
            });
          }
        });
  
        return lists;
      });
}
  
function create(newList) {
    return knex("lists")
        .insert(newList)
        .returning("*")
        .then((row) => row[0]) // only send the first row
}

function readId(listId){
    return knex("list")
        .select("*")
        .where({ id: "listId" });
}




module.exports = { 
    list,
    create, 
    readId,
}
