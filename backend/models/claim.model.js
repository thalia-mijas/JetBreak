const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Claim = sequelize.define("Claim", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_identity_card: {
    type: DataTypes.STRING,
    references: {
      model: "User",
      key: "identity_card",
    },
  },
  airline_iata: {
    type: DataTypes.STRING(2),
    references: {
      model: "Airline",
      key: "iata_code",
    },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flight_iata: {
    type: DataTypes.STRING,
    allowNull: false,
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
