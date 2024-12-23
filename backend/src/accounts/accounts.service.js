const knex = require("../db/connection");

function list() {
  return knex("accounts").select("*");
}

function read(accountId) {
  return knex("accounts")
    .select("accounts.*")
    .where({ "accounts.id": accountId })
    .first()
    .then(async (account) => {
      if (!account) return null;

      // Fetch the lists associated with the account
      const lists = await knex("lists").select("*").where({ account_id: accountId });

      return { ...account, lists }; // Combine account details with associated lists
    });
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
