const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flights.controller");
const flightTrackingController = require("../controllers/flightTracking.controller");

router.get("/arrivals/:iataCode", flightController.getArrivals);
router.get("/departures/:iataCode", flightController.getDepartures);
router.post("/tracking", flightTrackingController.createFlightTracking);
router.get(
  "/tracking/:user_id",
  flightTrackingController.getUserFlightTrackings
);
router.delete("/tracking/:id", flightTrackingController.deleteFlightTracking);

module.exports = router;
