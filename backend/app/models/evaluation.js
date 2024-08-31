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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    practice_skills: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_age_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_age_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Evaluation;
};
