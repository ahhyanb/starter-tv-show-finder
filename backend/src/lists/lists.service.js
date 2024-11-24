const knex = require("../db/connection");

function list() {
    return knex("lists")
        .select("*");
}

module.exports = list;
