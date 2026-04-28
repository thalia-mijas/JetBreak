const express = require("express");
const router = express.Router();
const airlinesController = require("../controllers/airlines.controller");

router.get("/airlines/", airlinesController.getAirlines);
router.get("/airlines/:airlineCode", airlinesController.getAirline);

module.exports = router;
