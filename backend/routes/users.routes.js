const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/users/", usersController.getUsers);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
