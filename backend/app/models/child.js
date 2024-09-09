const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Child = sequelize.define("childs", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    congenital_disease: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Child;
};
