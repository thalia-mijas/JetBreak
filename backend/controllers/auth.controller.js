const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = process.env;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No active session exists" });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout successful" });
};

exports.generateEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  // Generar token aleatorio
  const token = crypto.randomBytes(32).toString("hex");

  // Guardar en DB con expiración (ej. 15 minutos)
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  // Enviar email con el enlace
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

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
    html: `<p>Haz clic <a href="${resetLink}">aquí</a> para restablecer tu contraseña.</p>`,
  });

  res.status(200).json({ message: "Correo enviado" });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() }, // aún válido
  });

  if (!user)
    return res.status(400).json({ message: "Token inválido o expirado" });

  // Actualizar contraseña y limpiar token
  user.password = hashPassword(newPassword);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();

  res.json({ message: "Contraseña actualizada correctamente" });
};
