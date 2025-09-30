const express = require("express");
const router = express.Router();
const airlinesController = require("../controllers/airlines.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.get("/airlines/", airlinesController.getAirlines);
router.get("/:airlineCode", airlinesController.getAirline);

module.exports = router;
