const express = require("express");
const router = express.Router();
const airlineController = require("../controllers/airline.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.get("/", airlineController.getAirlines);
router.get("/:airlineCode", airlineController.getAirline);

module.exports = router;
