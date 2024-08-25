const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Confirmation = sequelize.define("confirmations");

  return Confirmation;
};
