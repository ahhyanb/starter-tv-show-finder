const service = require("./lists.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    const list = await service.list();
    res.json({ data: list });
}

module.exports = {
    list: asyncErrorBoundary(list),
}