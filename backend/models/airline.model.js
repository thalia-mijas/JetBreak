const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Airline = sequelize.define("Airline", {
  iata_code: {
    type: DataTypes.STRING(2),
    primaryKey: true,
    validate: {
      len: [2],
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Airline;
