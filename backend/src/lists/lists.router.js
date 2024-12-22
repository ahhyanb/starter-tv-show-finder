const router = require("express").Router();
const controller = require("./lists.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:listId/shows/:showId")
  .delete(controller.removeShow) // Add the controller method for deleting a show
  .all(methodNotAllowed);

router
  .route("/:listId/shows")
  .put(controller.addShow)
  .all(methodNotAllowed);

router
  .route("/:listId")
  .get(controller.readId)
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
