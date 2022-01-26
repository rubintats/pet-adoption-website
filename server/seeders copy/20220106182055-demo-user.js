"use strict";
const bcrypt = require("bcrypt");

const makePassword = (pw) => {
  return new Promise(async (rs) => {
    let salt, hash;
    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(pw, salt);
    return rs(hash);
  });
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let password = await makePassword("abcABC123!@#");
    return queryInterface.bulkInsert("Users", [
      {
        userName: "admin",
        password,
        firstName: "admin",
        lastName: "admin",
        email: "admin@admin.com",
        role: "admin",
        phoneNumber: "0501110000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
