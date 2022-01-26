"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Pets", "hypoallergenic", {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      }),
      queryInterface.changeColumn("Pets", "dietaryRestrictions", {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Pets", "hypoallergenic", {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      }),
      queryInterface.changeColumn("Pets", "dietaryRestrictions", {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      }),
    ]);
  },
};
