const express = require("express");
const router = express.Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./lists.controller");

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router.route("/:listId")
    .get(controller.readId)
    .all(methodNotAllowed);    

module.exports = router;