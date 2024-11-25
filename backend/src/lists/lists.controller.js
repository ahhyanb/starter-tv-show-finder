//>> | `GET`       | `/lists`               | Returns all lists within the database.                           |
// | `GET`       | `/lists/:listId`       | Returns a single list with the matching ID.                      |
// | `POST`      | `/lists`               | Should create a new list and return that list with its ID.       |
// | `PUT`       | `/lists/:listId`       | Updates an list based on the                                     |
// | `DELETE`    | `/lists/:listId`       | Should delete the specified list.                                |


const service = require("./lists.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const lists = await service.list();
    res.json({ data: lists });
}

async function create(req, res, next) {
    const createdList = await service.create(req.body.data);
    res.status(201).json({ data: createdList });
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: asyncErrorBoundary(create),
}