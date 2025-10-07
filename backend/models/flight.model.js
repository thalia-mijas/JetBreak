const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Airline = require("./airline.model");

const Flight = sequelize.define("Flight", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  flight_iata: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 6],
      is: {
        args: /^[A-Z]{2}[0-9]{1,4}$/,
        msg: "El código IATA del vuelo debe tener 2 letras seguidas de 1 a 4 números (ej: AA123)",
      },
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
  date_departure: {
    type: DataTypes.DATE,
    allowNull: true,
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
