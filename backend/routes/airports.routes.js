const express = require("express");
const router = express.Router();
const airportsController = require("../controllers/airports.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.get("/airports/", airportsController.getAirports);
router.get("/airports/:airportCode", airportsController.getAirport);
router.get(
  "/airports/gps/:latitude/:longitude",
  airportsController.getAirportsByUbication
);

module.exports = router;
