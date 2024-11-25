const knex = require("../db/connection");

console.log(
    knex("lists")
      .select(
        "lists.id as list_id",
        "lists.title as list_title",
        "lists.account_id",
        "shows.id as show_id",
        "shows.name as show_name",
        "shows.genre as show_genre",
        "shows.summary as show_summary"
      )
      .leftJoin("shows_lists", "lists.id", "shows_lists.list_id")
      .leftJoin("shows", "shows_lists.show_id", "shows.id")
      .toString()
  );
  


function create(newList) {
    return knex("lists")
        .insert(newList)
        .returning("*")
        .then((row) => row[0]) // only send the first row
}



module.exports = { 
    // list,
    create, 
}
