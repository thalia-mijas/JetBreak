const bcrypt = require("bcrypt");
const User = require("../models/user.model");

function getTestUserConfig() {
  return {
    name: process.env.TEST_USER_NAME || "Usuario Demo",
    email: process.env.TEST_USER_EMAIL || "demo@jetbreak.com",
    password: process.env.TEST_USER_PASSWORD || "JetBreak2026!",
  };
}

async function seedTestUser() {
  const testUser = getTestUserConfig();
  const hashedPassword = await bcrypt.hash(testUser.password, 10);
  const existing = await User.findOne({ where: { email: testUser.email } });

  if (existing) {
    existing.name = testUser.name;
    existing.password = hashedPassword;
    existing.resetToken = null;
    existing.resetTokenExpires = null;
    await existing.save();
    console.log(`Usuario de prueba actualizado: ${testUser.email}`);
  } else {
    await User.create({
      name: testUser.name,
      email: testUser.email,
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    });
    console.log(`Usuario de prueba creado: ${testUser.email}`);
  }

  return testUser;
}

module.exports = { seedTestUser };

if (require.main === module) {
  const dotenv = require("dotenv");
  dotenv.config();
  const sequelize = require("../config/db");

  (async () => {
    try {
      await sequelize.authenticate();
      await User.sync();
      const testUser = await seedTestUser();
      console.log(`Contraseña: ${testUser.password}`);
      process.exit(0);
    } catch (err) {
      console.error("Error al crear usuario de prueba:", err);
      process.exit(1);
    }
  })();
}
