const express = require("express");
const router = express.Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./lists.controller");

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;