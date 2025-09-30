const express = require("express");
const router = express.Router();
const offersController = require("../controllers/offers.controller");

router.get("/offers/:origin", offersController.getOffers);
router.get("/offers/detail/:conf", offersController.getOfferDetails);

module.exports = router;
