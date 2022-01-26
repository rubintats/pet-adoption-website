"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Pets", "height", {
        defaultValue: null,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Pets", "weight", {
        defaultValue: null,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Pets", "color", {
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Pets", "height", {
        defaultValue: null,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Pets", "weight", {
        defaultValue: null,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Pets", "color", {
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      }),
    ]);
  },
};
