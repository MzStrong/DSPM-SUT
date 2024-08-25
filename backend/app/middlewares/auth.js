const SECRET = process.env.SECRET_JWT;
const jwt = require("jsonwebtoken");

// Middleware สำหรับการตรวจสอบ JWT
exports.authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    // console.log(req.user);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
