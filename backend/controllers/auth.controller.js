const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = process.env;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
};

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    //Almacenar el token en una cookie httpOnly
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logout successful" });
};

exports.generateEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ message: "User not found" });

  // Generar token aleatorio
  const token = crypto.randomBytes(32).toString("hex");

  // Guardar en DB con expiración (ej. 15 minutos)
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  // Enviar email con el enlace
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  // Configura tu transporte
  const transporter = nodemailer.createTransport({
    /* SMTP config */
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true para puerto 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Recuperación de contraseña",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <img src="cid:logo" alt="Logo" style="width: 250px; margin-bottom: 16px;" />
        <h2>Hola ${user.name},</h2>
        <p>Para ayudarte con el restablecimiento de tu clave haz clic <a href="${resetLink}">aquí</a>.</p>
      </div>
    `,
    attachments: [
      {
        filename: "icon.png",
        path: __dirname + "/../public/icon.png",
        cid: "logo",
      },
    ],
  });

  res.status(200).json({ message: "Recovery email sent" });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpires: { [Op.gt]: Date.now() }, // aún válido
    },
  });

  console.log("User found for token:", user);

  if (!user)
    return res.status(400).json({ message: "Token inválido o expirado" });

  // Actualizar contraseña y limpiar token
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpires = null;
  await user.save();

  res.json({ message: "Contraseña actualizada correctamente" });
};
