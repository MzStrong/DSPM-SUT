const sequelize = require("../../config/db");

const Relationship = require("./relationship")(sequelize);
const Gender = require("./gender")(sequelize);
const Child = require("./child")(sequelize);
const User = require("./user")(sequelize);
const Admin = require("./admin")(sequelize);
const Policy = require("./policy")(sequelize);
const Confirmation = require("./confirmation")(sequelize);
const Topic = require("./topic")(sequelize);
const Evaluation = require("./evaluation")(sequelize);
const Assetment = require("./assetment")(sequelize);

// Define associations
Relationship.hasMany(Child);
Child.belongsTo(Relationship);

Gender.hasMany(User);
User.belongsTo(Gender);

User.hasMany(Child);
Child.belongsTo(User);

Gender.hasMany(Child);
Child.belongsTo(Gender);

Admin.hasMany(Policy);
Policy.belongsTo(Admin);

Policy.hasMany(Confirmation);
Confirmation.belongsTo(Policy);

User.hasMany(Confirmation);
Confirmation.belongsTo(User);

Topic.hasMany(Evaluation);
Evaluation.belongsTo(Topic);

Evaluation.hasMany(Assetment);
Assetment.belongsTo(Evaluation);

Child.hasMany(Assetment);
Assetment.belongsTo(Child);

module.exports = {
  sequelize,
  Relationship,
  Gender,
  Child,
  User,
  Admin,
  Policy,
  Confirmation,
  Topic,
  Evaluation,
  Assetment,
};
