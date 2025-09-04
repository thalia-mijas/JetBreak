const express = require("express");
const router = express.Router();
const claimsController = require("../controllers/claims.controller");

router.post("/", claimsController.createClaim);
router.get("/", claimsController.getClaims);
router.get("/byUser/:userId", claimsController.getClaimsByUserId);
router.delete("/:id", claimsController.delClaim);

module.exports = router;
