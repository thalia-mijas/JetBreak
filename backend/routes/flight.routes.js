const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flight.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.get("/arrivals/:iataCode", flightController.getArrivals);

module.exports = router;
