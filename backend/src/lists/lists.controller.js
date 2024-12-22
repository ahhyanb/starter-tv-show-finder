const service = require("./lists.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function removeShow(req, res, next) {
  const { listId, showId } = req.params; // Extract listId and showId
  console.log(`Received listId: ${listId}, showId: ${showId}`); // Debugging log

  try {
    const result = await service.removeShowFromList(listId, showId);

    if (result) {
      res.status(204).end(); // Success: No content
    } else {
      next({ status: 404, message: `Show ID ${showId} not found in List ID ${listId}` });
    }
  } catch (error) {
    next(error); // Handle unexpected errors
  }
}


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

   console.log(req.body);

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

async function addShow(req, res, next) {
  const { listId } = req.params; // Extract listId from URL
  const { data } = req.body; // Extract data from the request body
  
  // Check if data is nested improperly
  const showId = data?.showId || req.body?.data?.showId; // Handle potential nesting

  if (!showId) {
    return next({ status: 400, message: "Show ID is required." });
  }

  console.log("List ID:", listId, "Show ID:", showId); // Debugging log

  // Check if the show already exists in the list
  const existingRelation = await service.isShowInList(listId, showId);
  if (existingRelation) {
    return next({ status: 400, message: "This show is already in the list." });
  }

  // Add the show to the list
  const addedShow = await service.addShowToList(listId, showId);
  res.status(200).json({ data: addedShow });
}




module.exports = {
  list: asyncErrorBoundary(list),
  readId: [asyncErrorBoundary(validateListId), asyncErrorBoundary(readId)],
  create: [validateListData, asyncErrorBoundary(create)],
  update: [validateListId, validateListData, asyncErrorBoundary(update)],
  destroy: [validateListId, asyncErrorBoundary(destroy)],
  addShow: asyncErrorBoundary(addShow),
  removeShow: asyncErrorBoundary(removeShow),
};
