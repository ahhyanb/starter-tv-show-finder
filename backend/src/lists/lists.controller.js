const service = require("./lists.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function validateListId(req, res, next) {
  const { listId } = req.params;
  const list = await service.readId(listId);

  if (!list) {
    return next({ status: 404, message: `List ID: ${listId} not found.` });
  }

  res.locals.list = list;
  next();
}

async function validateListData(req, res, next) {
  const { data = {} } = req.body;

  if (!data.title) {
    return next({ status: 400, message: "List title is required." });
  }

  if (!data.account_id) {
    return next({ status: 400, message: "List account_id is required." });
  }

  res.locals.list = data;
  next();
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function readId(req, res) {
  res.json({ data: res.locals.list });
}

async function create(req, res) {
  const data = await service.create(res.locals.list);
  res.status(201).json({ data });
}

async function update(req, res) {
  const { listId } = req.params;
  const updatedList = await service.update(listId, res.locals.list);
  res.status(201).json({ data: updatedList }); // Send the updated list with a 201 status
}


async function destroy(req, res) {
  const { listId } = req.params;
  const deletedList = await service.readId(listId); // Fetch the list before deleting
  if (deletedList) {
    await service.destroy(listId);
    res.status(200).json({ data: deletedList }); // Return deleted list in response
  } else {
    res.status(404).json({ error: `List with ID ${listId} not found` });
  }
}


module.exports = {
  list: asyncErrorBoundary(list),
  readId: [asyncErrorBoundary(validateListId), asyncErrorBoundary(readId)],
  create: [validateListData, asyncErrorBoundary(create)],
  update: [validateListId, validateListData, asyncErrorBoundary(update)],
  destroy: [validateListId, asyncErrorBoundary(destroy)],
};
