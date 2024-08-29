const SECRET = process.env.SECRET_JWT;
const jwt = require("jsonwebtoken");

// // Middleware สำหรับการตรวจสอบ JWT
// exports.authenticateJWT = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET);
//     // console.log(req.user);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// Middleware สำหรับการตรวจสอบ JWT Admin
exports.adminVerify = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    if(req.user.role !== 'admin'){
      return res.status(401).json({ message: "Invalid role (not admin)" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
// Middleware สำหรับการตรวจสอบ JWT User
exports.userVerify = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    if(req.user.role !== 'user'){
      return res.status(401).json({ message: "Invalid role (not user)" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
