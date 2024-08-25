const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Topic = sequelize.define("topics", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Topic;
};