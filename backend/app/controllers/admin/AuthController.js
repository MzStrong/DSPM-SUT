const { Admin } = require("../../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_JWT;

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await Admin.findOne({
      where: { email },
    });
    if (!result) {
      return res.status(401).json({
        message: "Wrong email",
      });
    }

    const match = await bcrypt.compare(password, result.password);
    if (!match) {
      return res.status(401).json({
        error: "Wrong password!",
      });
    }

    const token = jwt.sign({ email, role: "admin" }, SECRET, {
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

exports.createAdmin = async (req, res) => {
  try {
    const adminData = req.body;
    adminData.password = await bcrypt.hash(adminData.password, 10);

    const newAdmin = await Admin.create(adminData);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const adminData = req.body;
    adminData.password = await bcrypt.hash(adminData.password, 10);

    const newAdmin = await Admin.create(adminData);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    // ค้นหาผู้ใช้จาก email
    const admin = await Admin.findOne({
      where: { email: req.user.email },
    });

    // // ตรวจสอบว่าพบผู้ใช้หรือไม่
    // if (!admin) {
    //   return res.status(404).json({ message: 'Admin not found' });
    // }

    // เพิ่มชื่อเข้าไปใน req.user
    req.user.firstname = admin.firstname;
    req.user.lastname = admin.lastname;
    req.user.adminId = admin.id;

    return res.status(200).json(req.user);
  } catch (error) {
    console.error('Error fetching admin:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};