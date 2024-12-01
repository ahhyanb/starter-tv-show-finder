/* 
>>| `GET`       | `/lists`               | Returns all lists within the database.                           |
| `GET`       | `/lists/:listId`       | Returns a single list with the matching ID.                      |
>>| `POST`      | `/lists`               | Should create a new list and return that list with its ID.       |
| `PUT`       | `/lists/:listId`       | Updates an list based on the                                     |
| `DELETE`    | `/lists/:listId`       | Should delete the specified list.                                |
*/

const service = require("./lists.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function validList(req, res, next) {
  const newList = req.body.data;
 

  if (!newList) {
    return next({ status: 400, message: "List data is required." });
  }
  if (!newList.title) {
    return next({ status: 400, message: "List title is required." });
  }
  if (!newList.account_id) {
    return next({ status: 400, message: "List account_id is required." });
  }
  console.log("Validation Passed:", newList);
  res.locals.list = newList;
  return next();
}

async function create(req, res, next) {
  const newList = res.locals.list; // Use res.locals.list 
  const createdList = await service.create(newList); // Pass validated newList to the service
  res.status(201).json({ data: createdList });
}

async function list(req, res, next) {
  const data = await service.list();
  res.json({ data: data });
}

async function readId(req, res, next) {
    const { listId } = req.params;
    const listById = await service.readId(listId);
    res.json({ data: listById });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validList, asyncErrorBoundary(create)],
  readId: asyncErrorBoundary(readId),
};
