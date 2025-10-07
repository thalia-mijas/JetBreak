const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Flight = require("./flight.model");
const Airport = require("./airport.model");

const FlightAirport = sequelize.define(
  "FlightAirport",
  {
    flight_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Flight,
        key: "id",
      },
    },
    airport_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Airport,
        key: "id",
      },
    },
    type: {
      type: DataTypes.ENUM("origen", "destino"),
      allowNull: false,
    },
  },
  {
    tableName: "flight_airport",
    timestamps: false,
  }
);

module.exports = FlightAirport;
