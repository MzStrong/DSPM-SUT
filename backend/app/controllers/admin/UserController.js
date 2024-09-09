const { User, Gender, Relationship } = require("../../models/index");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // ยกเว้นคอลัม password
      include: [
        {
          model: Gender, // แทนที่ Topic ด้วยชื่อโมเดลที่คุณกำหนดไว้ใน Sequelize
          attributes: ["name"], // เลือกเฉพาะชื่อจาก Topic
        },
      ],
    });

    const response = users.map((user) => ({
      ...user.dataValues,
      genderName: user.gender ? user.gender.name : null, // เพิ่มชื่อหัวข้อที่ดึงมาจาก Topic
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params;
  const { firstname, lastname, age, telnum, cardid, genderId } = req.body;

  try {
    const updatedUser = await User.update(
      {
        firstname,
        lastname,
        age,
        telnum,
        cardid,
        genderId,
      },
      { where: id }
    );

    if (updatedUser[0]) {
      res.status(200).json({ message: "User updated successfully." });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePasswordUser = async (req, res) => {
  const id = req.params;
  const { password } = req.body;
  const newPassword = await bcrypt.hash(password, 10);

  try {
    const updatedUser = await User.update(
      {
        password: newPassword,
      },
      { where: id }
    );
    if (updatedUser[0]) {
      res.status(200).json({ message: "User password updated successfully." });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params;
    const deletedUser = await User.destroy({ where: id });

    if (deletedUser) {
      return res.status(200).json({ message: "User deleted successfully." });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
