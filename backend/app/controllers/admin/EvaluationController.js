const { Evaluation, Topic } = require("../../models/index");

exports.getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll({
      include: [
        {
          model: Topic, // แทนที่ Topic ด้วยชื่อโมเดลที่คุณกำหนดไว้ใน Sequelize
          attributes: ["name"], // เลือกเฉพาะชื่อจาก Topic
        },
      ],
      order: [
        ["start_age_months", "ASC"],
        ["to_age_months", "ASC"],
      ],
    });

    // ถ้าต้องการแสดงชื่อหัวข้อในการตอบกลับ
    const response = evaluations.map((evaluation) => ({
      ...evaluation.dataValues,
      topicName: evaluation.topic ? evaluation.topic.name : null, // เพิ่มชื่อหัวข้อที่ดึงมาจาก Topic
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEvaluation = async (req, res) => {
  try {
    const evaluationData = req.body;
    // evaluationData.status = true;

    // const admin = await Admin.findOne({
    //   where: { email: req.user.email },
    // });
    // evaluationData.adminId = admin.id

    const newEvaluation = await Evaluation.create(evaluationData);
    res.status(201).json(newEvaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvaluation = async (req, res) => {
  try {
    const id = req.params;
    const deletedEvaluation = await Evaluation.destroy({ where: id });

    if (deletedEvaluation) {
      return res
        .status(200)
        .json({ message: "Evaluation deleted successfully." });
    } else {
      return res.status(404).json({ error: "Evaluation not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateEvaluation = async (req, res) => {
  const id = req.params;
  const {
    skill,
    link_video,
    evaluation_method,
    practice_skills,
    start_age_months,
    to_age_months,
    topicId,
  } = req.body;

  try {
    const updatedEvaluation = await Evaluation.update(
      {
        skill,
        link_video,
        evaluation_method,
        practice_skills,
        start_age_months,
        to_age_months,
        topicId,
      },
      { where: id }
    );

    if (updatedEvaluation[0]) {
      res.status(200).json({ message: "Evaluation updated successfully." });
    } else {
      res.status(404).json({ error: "Evaluation not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
