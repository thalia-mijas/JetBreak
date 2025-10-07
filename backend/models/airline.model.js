const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Airline = sequelize.define("Airline", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  iata_code: {
    type: DataTypes.STRING,
    validate: {
      len: [2, 2], // Exactamente 2 caracteres
      isUppercase: true, // Fuerza mayúsculas
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Airline;
