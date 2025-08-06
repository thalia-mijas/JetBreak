const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = process.env;

// Middleware to authenticate JWT token
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const authHeader = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
