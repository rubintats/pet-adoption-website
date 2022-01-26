"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "bio",
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
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Users", "bio", { transaction: t }),
      ]);
    });
  },
};
