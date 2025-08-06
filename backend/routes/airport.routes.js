const express = require("express");
const router = express.Router();
const airportController = require("../controllers/airport.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.get("/", airportController.getAirports);
router.get("/:airportCode", airportController.getAirport);
router.get(
  "/gps/:latitude/:longitude",
  airportController.getAirportsByUbication
);

module.exports = router;
