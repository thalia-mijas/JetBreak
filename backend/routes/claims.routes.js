const express = require("express");
const router = express.Router();
const claimsController = require("../controllers/claims.controller");
// const authMiddleware = require("../middlewares/auth.middleware"); aqui se agregar si se necesita middlewares

router.post("/", claimsController.createClaim);

module.exports = router;
