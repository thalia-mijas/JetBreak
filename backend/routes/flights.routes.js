const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flights.controller");
const flightTrackingController = require("../controllers/flightTracking.controller");

router.get("/flights/arrivals/:iataCode", flightController.getArrivals);
router.get("/flights/departures/:iataCode", flightController.getDepartures);
router.post("/flights/tracking", flightTrackingController.createFlightTracking);
router.get(
  "/flights/tracking/:user_id",
  flightTrackingController.getUserFlightTrackings
);
router.delete(
  "/flights/tracking/:user_id/:flight_id",
  flightTrackingController.deleteFlightTracking
);

module.exports = router;
