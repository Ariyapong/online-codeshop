// import Sequelize from "sequelize";

const Sequelize = require("sequelize");
const codeOnline = require("./code.js");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  // process.env.DATABASE,
  // process.env.DATABASE_USER,
  // process.env.DATABASE_PASSWORD,
  "online-code-retail-shop",
  "tony",
  "YnWm6TqupHErXz2Yw7hrceSoH7icD6SESt7yfdEZuB9ZxhCcMLqnQLLDDTa2r8qx",
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

const models = {
  // User: sequelize.import("./code-online.js"),
  // Code: codeOnline.codeOnline(sequelize, Sequelize),
  // Code: sequelize.import("./code-online.js"),
  Sequelize : Sequelize,
  sequelize : sequelize,
  code : require("./code.js")(sequelize, Sequelize),
  reward : require("./reward.js")(sequelize, Sequelize),
};

// models.Sequelize = Sequelize;
// models.sequelize = sequelize;

// models.code = require("./code.js").codeOnline(sequelize, Sequelize);
// models.code = require("./code.js")(sequelize, Sequelize);

// console.log("Seq Report", sequelize.model("BCRM_Retail_BuyCodeOnline"));
// console.log("Db name Report", sequelize.getDatabaseName());

// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associate(models);
//   }
// });

// export { sequelize };

// module.exports = {
//   sequelize,
//   models,
// };
module.exports = models;

// export default models;
