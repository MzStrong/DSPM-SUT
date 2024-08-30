const { Admin } = require("../../models/index");
const bcrypt = require("bcrypt");

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ["password"] }, // ยกเว้นคอลัม password
    });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  const id = req.params;
  const { firstname, lastname, email, phone } = req.body;

  try {
    const updatedAdmin = await Admin.update(
      {
        firstname,
        lastname,
        email,
        phone,
      },
      { where: id }
    );

    if (updatedAdmin[0]) {
      res.status(200).json({ message: "Admin updated successfully." });
    } else {
      res.status(404).json({ error: "Admin not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePasswordAdmin = async (req, res) => {
  const id = req.params;
  const { password } = req.body;
  const newPassword = await bcrypt.hash(password, 10);

  try {
    const updatedAdmin = await Admin.update(
      {
        password: newPassword
      },
      { where: id }
    );
    if (updatedAdmin[0]) {
      res.status(200).json({ message: "Admin password updated successfully." });
    } else {
      res.status(404).json({ error: "Admin not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const id = req.params;
    const deletedAdmin = await Admin.destroy({ where: id });

    if (deletedAdmin) {
      return res.status(200).json({ message: "Admin deleted successfully." });
    } else {
      return res.status(404).json({ error: "Admin not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
