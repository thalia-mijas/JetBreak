const express = require("express");
const router = express.Router();
const storesController = require("../controllers/stores.controller");

router.get("/:latitude/:longitude", storesController.getStores);

module.exports = router;
