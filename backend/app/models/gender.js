const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Gender = sequelize.define('genders', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Gender;
};
