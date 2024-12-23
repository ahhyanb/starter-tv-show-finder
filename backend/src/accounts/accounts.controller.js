const service = require("./accounts.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware: Check if account exists
async function accountIdExists(req, res, next) {
  const { accountId } = req.params;
  const account = await service.read(accountId);

  if (account) {
    res.locals.account = account;
    return next();
  }

  next({ status: 404, message: `Account ID ${accountId} does not exist.` });
}

// Middleware: Validate account data
async function accountValid(req, res, next) {
  const account = req.body.data;

  if (!account) {
    return next({ status: 400, message: "Account data is required." });
  }
  if (!account.name) {
    return next({ status: 400, message: "Field 'name' is required and cannot be empty." });
  }
  if (!account.username) {
    return next({ status: 400, message: "Field 'username' is required and cannot be empty." });
  }

  res.locals.account = { ...res.locals.account, ...account }; // Merge validated data
  next();
}

// List all accounts
async function list(req, res, next) {
  const accounts = await service.list();
  res.status(200).json({ data: accounts });
}

// Get a single account
async function read(req, res, next) {
  res.status(200).json({ data: res.locals.account });
}


// Create a new account
async function create(req, res, next) {
  const newAccount = req.body.data; // Validated by `accountValid`
  const createdAccount = await service.create(newAccount);
  res.status(201).json({ data: createdAccount });
}

// Update an existing account
async function update(req, res, next) {
  const updatedAccount = res.locals.account; // Validated and merged
  const account = await service.update(updatedAccount);
  res.status(201).json({ data: account });
}

// Delete an account
async function destroy(req, res, next) {
  const account = res.locals.account; // Fetched by `accountIdExists`
  await service.delete(account.id); 
  res.status(200).json({ data: account });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(accountIdExists), asyncErrorBoundary(read)],
  create: [asyncErrorBoundary(accountValid), asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(accountIdExists),
    asyncErrorBoundary(accountValid),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(accountIdExists), asyncErrorBoundary(destroy)],
};
