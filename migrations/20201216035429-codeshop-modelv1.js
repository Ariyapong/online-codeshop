"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        // queryInterface.addColumn(
        //   "BCRM_Retail_SellCodeOnlines",
        //   // "BCRM_Retail_CodeOnlineShop_Prods",
        //   "DisplayStatus",
        //   {
        //     type: Sequelize.DataTypes.STRING,
        //     allowNull: true,
        //   },
        //   { transaction: t }
        // ),
        // queryInterface.addColumn(
        //   "BCRM_Retail_SellCodeOnlines",
        //   // "BCRM_Retail_CodeOnlineShop_Prods",
        //   "DisplayDescription",
        //   {
        //     type: Sequelize.DataTypes.STRING,
        //     allowNull: true,
        //   },
        //   { transaction: t }
        // ),
        queryInterface.addColumn(
          // "BCRM_Retail_SellCodeOnlines",
          "BCRM_Retail_CodeOnlineShop_Prods",
          "DisplayStatus",
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          // "BCRM_Retail_SellCodeOnlines",
          "BCRM_Retail_CodeOnlineShop_Prods",
          "DisplayDescription",
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
