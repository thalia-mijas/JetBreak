const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Flight = require("./flight.model");
const User = require("./user.model");

const UserFlight = sequelize.define(
  "UserFlight",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    flight_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Flight,
        key: "id",
      },
    },
  },
  {
    tableName: "user_flight",
    timestamps: false,
  }
);

module.exports = UserFlight;
