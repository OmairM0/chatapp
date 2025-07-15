const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Chat = sequelize.define("Chat", {
  name: DataTypes.STRING,
  ownerId: DataTypes.INTEGER,
  privacy: {
    type: DataTypes.TINYINT,
    defaultValue: 0, // 0 for public, 1 for private
  },
});

module.exports = Chat;
