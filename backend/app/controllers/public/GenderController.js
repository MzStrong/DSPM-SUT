const { Gender } = require("../../models/index");

exports.getAllGenders = async (req, res) => {
  try {
    const genders = await Gender.findAll();
    res.status(200).json(genders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
