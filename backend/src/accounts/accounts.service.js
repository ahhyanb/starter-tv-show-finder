const knex = require("../db/connection");

function list() {
  return knex("accounts").select("*");
}

function read(accountId) {
  return knex("accounts")
    .select("*")
    .where({ id: accountId })
    .first();
}

function create(newAccount) {
  return knex("accounts")
    .insert(newAccount)
    .returning("*")
    .then((rows) => rows[0]);
}

function update(updatedAccount) {
  return knex("accounts")
    .where({ id: updatedAccount.id })
    .update(updatedAccount)
    .returning("*")
    .then((rows) => rows[0]);
}

function deleteAccount(accountId) {
  return knex("accounts")
    .where({ id: accountId })
    .del();
}

module.exports = {
  list,
  read,
  create,
  update,
  delete: deleteAccount,
};
