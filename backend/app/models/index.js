const sequelize = require("../../config/db");

const Relationship = require("./relationship")(sequelize);
const Gender = require("./gender")(sequelize);
const User = require("./user")(sequelize);
const Parent = require("./parent")(sequelize);
const Admin = require("./admin")(sequelize);
const Policy = require("./policy")(sequelize);
const Confirmation = require("./confirmation")(sequelize);
const Topic = require("./topic")(sequelize);
const Evaluation = require("./evaluation")(sequelize);
const Assetment = require("./assetment")(sequelize);

// Define associations
Relationship.hasMany(Parent);
Parent.belongsTo(Relationship);

Gender.hasMany(Parent);
Parent.belongsTo(Gender);

Parent.hasMany(User);
User.belongsTo(Parent);

Gender.hasMany(User);
User.belongsTo(Gender);

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

User.hasMany(Assetment);
Assetment.belongsTo(User);

module.exports = {
  sequelize,
  Relationship,
  Gender,
  User,
  Parent,
  Admin,
  Policy,
  Confirmation,
  Topic,
  Evaluation,
  Assetment,
};
