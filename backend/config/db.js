const { Sequelize } = require("sequelize");

const sslOptions = {
  require: true,
  rejectUnauthorized: false,
};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
      dialectOptions: { ssl: sslOptions },
    })
  : new Sequelize(
      process.env.NAME_DB,
      process.env.USER_DB,
      process.env.PASSWORD_DB,
      {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        dialect: "postgres",
        logging: false,
        // dialectOptions: { ssl: sslOptions },
      },
    );

module.exports = sequelize;
