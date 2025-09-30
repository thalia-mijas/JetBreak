const express = require("express");
const router = express.Router();
const claimsController = require("../controllers/claims.controller");

router.post("/claims/", claimsController.createClaim);
router.get("/claims/", claimsController.getClaims);
router.get("/claims/byUser/:userId", claimsController.getClaimsByUserId);
router.delete("/claims/:id", claimsController.delClaim);

module.exports = router;
