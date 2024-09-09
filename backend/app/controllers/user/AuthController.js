const { User } = require("../../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_JWT;

// Login Admin
exports.loginUser = async (req, res) => {
  const { cardid, password } = req.body;

  try {
    const result = await User.findOne({
      where: { cardid },
    });
    if (!result) {
      return res.status(401).json({
        message: "Wrong card ID!",
      });
    }

    const match = await bcrypt.compare(password, result.password);
    if (!match) {
      return res.status(401).json({
        error: "Wrong password!",
      });
    }

    const token = jwt.sign({ cardid, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      message: "Login success",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: "An error occurred",
      details: error.message,
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register
exports.createUser = async (req, res) => {
  const { cardid, password } = req.body;
  try {
    const userData = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);

    await User.create(userData);
    const token = jwt.sign({ cardid, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      message: "Login success",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUser = async (req, res) => {
  try {
    // ค้นหาผู้ใช้จาก email
    const user = await User.findOne({
      where: { cardid: req.user.cardid },
    });

    // // ตรวจสอบว่าพบผู้ใช้หรือไม่
    // if (!admin) {
    //   return res.status(404).json({ message: 'Admin not found' });
    // }

    // เพิ่มชื่อเข้าไปใน req.user
    req.user.firstname = user.firstname;
    req.user.lastname = user.lastname;
    req.user.userId = user.id;

    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    console.error("Error fetching admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
