const User = require("../models/user.model");
const redisClient = require("../redis");
const CACHE_TIME = process.env.CACHE_TIME;

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { document_type, country, identity_card, name, email, password } =
      req.body;

    if (!document_type || !identity_card || !name || !email || !password) {
      return res.status(400).json({
        message:
          "document_type, identity_card, name, email, and password are required",
      });
    }

    const user = await User.create({
      document_type,
      country,
      identity_card,
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
