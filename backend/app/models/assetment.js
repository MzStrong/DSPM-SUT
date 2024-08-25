const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Assetment = sequelize.define("assetment", {
    ans: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Assetment;
};
