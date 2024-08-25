const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Admin = sequelize.define(
        "admins",
        {
          firstname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        }
      );

  return Admin;
};
