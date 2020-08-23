const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    // "online-code-retail-shop",
    // "tony",
    // "YnWm6TqupHErXz2Yw7hrceSoH7icD6SESt7yfdEZuB9ZxhCcMLqnQLLDDTa2r8qx",
    {
      host: "35.186.148.99",
      port: 5432,
      dialect: "postgres",
      dialectOptions: {
        useUTC: false, //for reading from database
      },
      timezone: "+07:00", //for writing to database
    }
  );

  module.exports = sequelize;