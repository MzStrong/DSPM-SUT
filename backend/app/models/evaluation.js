const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Evaluation = sequelize.define("evaluations", {
    skill: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link_video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evaluation_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    practice_skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Evaluation;
};
