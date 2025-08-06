const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claim.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.post("/", claimController.createClaim);

module.exports = router;
