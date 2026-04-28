const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const User = require("../models/user.model");

const TEST_USER = {
  name: process.env.TEST_USER_NAME || "Usuario Demo",
  email: process.env.TEST_USER_EMAIL || "demo@jetbreak.com",
  password: process.env.TEST_USER_PASSWORD || "JetBreak2026!",
};

(async () => {
  try {
    await sequelize.authenticate();
    await User.sync();

    const existing = await User.findOne({ where: { email: TEST_USER.email } });
    const hashedPassword = await bcrypt.hash(TEST_USER.password, 10);

    if (existing) {
      existing.name = TEST_USER.name;
      existing.password = hashedPassword;
      existing.resetToken = null;
      existing.resetTokenExpires = null;
      await existing.save();
      console.log(`Usuario de prueba actualizado: ${TEST_USER.email}`);
    } else {
      await User.create({
        name: TEST_USER.name,
        email: TEST_USER.email,
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      });
      console.log(`Usuario de prueba creado: ${TEST_USER.email}`);
    }

    console.log(`Contraseña: ${TEST_USER.password}`);
    process.exit(0);
  } catch (err) {
    console.error("Error al crear usuario de prueba:", err);
    process.exit(1);
  }
})();
