const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.HOST,
      port: process.env.PORT,
      dialect: "postgres",
      dialectOptions: {
        useUTC: false, //for reading from database
      },
      timezone: "+07:00", //for writing to database
    }
  );

  module.exports = sequelize;