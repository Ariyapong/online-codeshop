const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
// const sequelize = require("./database");
const models = require("./models");

const usersRouter = require("./routes/all");
const codeRegisRouter = require("./routes/regis-code-route");
const rewardRouter = require("./routes/reward-route");
const rewardDetailRouter = require("./routes/reward-detail-route");

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

// Implement route
app.use("/", codeRegisRouter);
app.use("/api/reward", rewardRouter);
app.use("/users", usersRouter);

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

models.sequelize.sync().then((res) => {
  //   console.log(`PostgreSQL connected ${err}.`);
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
  });
  //   console.log(`PostgreSQL connected`, res);
});

module.exports = app;
