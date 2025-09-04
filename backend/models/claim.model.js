const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Airline = require("./airline.model");

const Claim = sequelize.define("Claim", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  airline_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Airline,
      key: "id",
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flight_iata: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 6], // mínimo 3 (ej: AA1), máximo 6 (ej: AA1234)
      is: /^[A-Z]{2}[0-9]{1,4}$/, // 2 letras + 1 a 4 números
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Claim;
