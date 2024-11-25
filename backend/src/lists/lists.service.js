const knex = require("../db/connection");

function list() {
    return knex("lists")
        .select("*");
}

function create(newList) {
    return knex("lists")
        .insert(newList)
        .returning("*")
        .then((row) => row[0]) // only send the first row
}

module.exports = { 
    list,
    create, 
}
