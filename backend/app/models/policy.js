const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Policy = sequelize.define(
    "policies",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
  );

  return Policy;
};
