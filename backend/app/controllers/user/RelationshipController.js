const { Relationship } = require("../../models/index");

exports.getAllRelationships = async (req, res) => {
  try {
    const relationships = await Relationship.findAll();
    res.status(200).json(relationships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
