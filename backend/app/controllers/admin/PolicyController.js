const { Policy, Admin } = require("../../models/index");

exports.getAllPolicys = async (req, res) => {
  try {
    const policy = await Policy.findAll();
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPolicy = async (req, res) => {
  try {
    const policyData = req.body;
    policyData.status = true;

    const admin = await Admin.findOne({
      where: { email: req.user.email },
    });
    policyData.adminId = admin.id

    const newPolicy = await Policy.create(policyData);
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePolicy = async (req, res) => {
  try {
    const id = req.params;
    const deletedPolicy = await Policy.destroy({ where: id });

    if (deletedPolicy) {
      return res.status(200).json({ message: "Policy deleted successfully." });
    } else {
      return res.status(404).json({ error: "Policy not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updatePolicy = async (req, res) => {
  const id = req.params;
  const { title, description } = req.body;

  try {
    const updatedPolicy = await Policy.update(
      { title, description },
      { where: id }
    );

    if (updatedPolicy[0]) {
      res.status(200).json({ message: "Policy updated successfully." });
    } else {
      res.status(404).json({ error: "Policy not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePolicyStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Policy.update({ status }, { where: { id }, returning: true });

    const updatedPolicy = await Policy.findByPk(id);
    return res.status(200).json(updatedPolicy);

  } catch (error) {
    res.status(500).json({ message: "Error updating policy" });
  }
};
