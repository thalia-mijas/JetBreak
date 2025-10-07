const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    dialect: "postgres",
    logging: false, // opcional
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // For hosted databases like Render
      }
    }
  }
);

module.exports = sequelize;
