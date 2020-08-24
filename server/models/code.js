// const codeOnline = (sequelize, DataTypes) => {
module.exports = (sequelize, DataTypes) => {
  // const CodeOnline = sequelize.define('BCRM_Retail_BuyCodeOnline', {
  // const CodeOnline = sequelize.define('BCRM_Retail_Sell2CodeOnline', {

  const CodeOnline = sequelize.define(
    "BCRM_Retail_SellCodeOnline",
    // "BCRM_Retail_CodeOnlineShop_Prod",
    {
      // CodeOnlineId: {
      //   type: DataTypes.INTEGER,
      //   // unique: true,
      //   allowNull: true,
      //   primaryKey: true,
      //   autoIncrement: true

      //   // validate: {
      //   //   notEmpty: true,
      //   // },
      // },
      CodeOnlineId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CampaignSeries: {
        type: DataTypes.STRING,
        // unique: false,
      },
      CampaignKey1: {
        type: DataTypes.STRING,
        // unique: true,
      },
      CampaignKey2: {
        type: DataTypes.STRING,
        // unique: true,
      },
      Code: {
        type: DataTypes.STRING,
        // unique: true,
      },
      MobileNo: {
        type: DataTypes.STRING,
        // unique: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        // unique: true,
      },
      LastName: {
        type: DataTypes.STRING,
        // unique: true,
      },
      CountsVisit: {
        type: DataTypes.INTEGER,
      },
      RewardId : {
        type: DataTypes.INTEGER,
      },
      // Reward_Name: {
      //   type: DataTypes.STRING,
      // },
      // Reward_Detail: {
      //   type: DataTypes.STRING,
      // },
      Remark: {
        type: DataTypes.STRING,
      },
      Extra_Data: {
        type: DataTypes.STRING,
        // unique: true,
      },
      IsActived: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        // unique: true,
        // validate: {
        //   notEmpty: true,
        // },
      },
      IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // PurchasedAmount: {
      //   type: DataTypes.INTEGER
      // },
      FirstLogin_TS: {
        type: "TIMESTAMP",
        // unique: true,
      },
      LastLogin_TS: {
        type: "TIMESTAMP",
        // unique: true,
      },
      Redeemed_TS: {
        type: "TIMESTAMP",
        // unique: true,
      },
      Purchased_TS: {
        type: "TIMESTAMP",
      },
      // UpdatedTime: {
      //   type: DataTypes.DATE,
      // },
      // CreatedTime: {
      //   type: DataTypes.DATE,
      // },
      UpdatedTime: {
        type: "TIMESTAMP",
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        // allowNull: false,
      },
      CreatedTime: {
        type: "TIMESTAMP",
        // defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        // allowNull: false,
      },
    }
    ,
    {
      timestamps: false
    }
  );





  return CodeOnline;
};

// export default codeOnline;
// module.exports = { codeOnline }
