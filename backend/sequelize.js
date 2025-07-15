const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.SERVER_NAME,
    dialect: "mysql",
    port: process.env.SERVER_PORT,
  }
);

module.exports = sequelize;
