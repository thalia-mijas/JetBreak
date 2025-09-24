const express = require("express");
const router = express.Router();
const offersController = require("../controllers/offers.controller");

router.get("/:origin", offersController.getOffers);
router.get("/detail/:conf", offersController.getOfferDetails);

module.exports = router;
