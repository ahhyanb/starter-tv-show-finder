const express = require("express");
const router = express.Router();
const controller = require("./accounts.contoller");
const methodNotAllowed = require("../errors/errorHandler");


router.route("/")
    .get(controller.list)
    

router.route("/:accountId")
    .get(controller.read)

module.exports = router;