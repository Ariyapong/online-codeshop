const dotenv = require("dotenv");
dotenv.config();

// const codeOnline = (sequelize, DataTypes) => {
module.exports = (sequelize, DataTypes) => {
  const RewardOnline = sequelize.define(
    // `${process.env.RWDETAIL_DB}`,
    "BCRM_Retail_RewardCodeOnline",
    // "BCRM_Retail_RewardDetail_Prod",
    {
      RewardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Reward_Name: {
        type: DataTypes.STRING,
      },
      Reward_Detail: {
        type: DataTypes.STRING,
      },
      Reward_Type: {
        type: DataTypes.STRING,
      },
      TermCondition: {
        type: DataTypes.STRING(1000),
      },
      Remark: {
        type: DataTypes.STRING,
      },
      ExtraData: {
        type: DataTypes.STRING,
      },
      ImageURL: {
        type: DataTypes.STRING,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      timestamps: false,
    }
  );
  return RewardOnline;
};
