const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    telnum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return User;
};
