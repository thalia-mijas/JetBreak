const express = require("express");
const router = express.Router();
const airportsController = require("../controllers/airports.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.get("/", airportsController.getAirports);
router.get("/:airportCode", airportsController.getAirport);
router.get(
  "/gps/:latitude/:longitude",
  airportsController.getAirportsByUbication
);

module.exports = router;
