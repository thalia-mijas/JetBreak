const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Airline = require("./airline.model");
const Airport = require("./airport.model");

const Flight = sequelize.define("Flight", {
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
  flight_iata: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  airline_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Airline,
      key: "id",
    },
  },
  origin_iata: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Airport,
      key: "id",
    },
  },
  date_departure: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  destination_iata: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Airport,
      key: "id",
    },
  },
  date_arrival: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Flight;
