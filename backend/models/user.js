const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define("User", {
  email: DataTypes.STRING,
  otp: DataTypes.STRING,
});

module.exports = User;
