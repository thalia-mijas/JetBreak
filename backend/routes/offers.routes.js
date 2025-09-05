const express = require("express");
const router = express.Router();
const offersController = require("../controllers/offers.controller");

router.get("/:origin/:destination/:date", offersController.getOffers);

module.exports = router;
