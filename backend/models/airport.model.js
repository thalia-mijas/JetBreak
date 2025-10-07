const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Airport = sequelize.define("Airport", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  iata_code: {
    type: DataTypes.STRING(3),
    validate: {
      len: [3, 3], // Exactamente 3 caracteres
      isUppercase: true, // Fuerza mayúsculas
    },
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Airport;
