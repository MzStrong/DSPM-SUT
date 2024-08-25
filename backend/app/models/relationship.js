const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Relationship = sequelize.define('relationships', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Relationship;
};
