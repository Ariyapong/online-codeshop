const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const sequelize = require("./database");

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
// Implement middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

sequelize.sync().then((res) => {
  //   console.log(`PostgreSQL connected ${err}.`);
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
  //   console.log(`PostgreSQL connected`, res);
});

module.exports = app;
