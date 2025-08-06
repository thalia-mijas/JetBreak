const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Claim = sequelize.define("Claim", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flight: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Claim;
