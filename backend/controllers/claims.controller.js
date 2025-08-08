const jwt = require("jsonwebtoken");
const Claim = require("../models/claim.model");
const createIPMiddleware = require("../middlewares/createIP.middleware");

// Create a new claim
exports.createClaim = async (req, res) => {
  try {
    const { type, flight, description } = req.body;

    if (!type || !flight || !description) {
      return res
        .status(400)
        .json({ message: "Type, flight, and description are required" });
    }

    // const claimIP = await createIPMiddleware(req, res, () => {}); si se requiere agregar el middleware

    const claim = await Claim.create({
      type,
      flight,
      description,
    });

    res
      .status(201)
      .json({ message: "Claim created successfully", claim: claim });
  } catch (error) {
    console.error("Error creating claim:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.findAll();
    res.status(200).json(claims);
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
