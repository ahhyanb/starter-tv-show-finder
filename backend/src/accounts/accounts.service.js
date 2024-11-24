const knex = require("../db/connection");

function list() {
    return knex("accounts").select("*");
}

function read(accountId) {
    return knex("accounts")
        .select("*")
        .where({ id: accountId})
        .first();
}

module.exports = { 
    list,
    read,
}