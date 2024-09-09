const { Topic } = require("../../models/index");

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
