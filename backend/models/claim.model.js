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
      len: [3, 6],
      is: {
        args: /^[A-Z]{2}[0-9]{1,4}$/,
        msg: "El código IATA del vuelo debe tener 2 letras seguidas de 1 a 4 números (ej: AA123)",
      },
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
