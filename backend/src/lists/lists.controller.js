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

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validList, asyncErrorBoundary(create)],
};
