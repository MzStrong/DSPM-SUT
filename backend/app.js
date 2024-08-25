const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./app/models");
const cors = require("cors");
const { authenticateJWT } = require("./app/middlewares/auth");
const {
  createGenders,
  createRelationship,
  createTopic,
} = require("./config/initData");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // แทนที่ด้วยโดเมนของคุณ
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// router
const adminAuthRoute = require("./app/routes/adminAuthRoutes");
const adminRoute = require("./app/routes/adminRoutes");
// Admin routes
app.use("/auth/admin", adminAuthRoute); // Route ที่ไม่ต้องตรวจ Token (Login)
app.use("/admin", authenticateJWT, adminRoute); // Route ที่ต้องตรวจ Token


const userAuthRoute = require("./app/routes/userAuthRoutes");
const userRoute = require("./app/routes/userRoutes");
// User routes
app.use("/auth/user", userAuthRoute); // Route ที่ไม่ต้องตรวจ Token (Login)
app.use("/user", authenticateJWT, userRoute); // Route ที่ต้องตรวจ Token


// Public Routes
const publicRoute = require("./app/routes/publicRoutes")
app.use("/api", publicRoute); // Route ที่ต้องตรวจ Token

// Error handling middleware
const errorHandler = require("./app/middlewares/errorHandler");
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      createGenders();
      createRelationship();
      createTopic();
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
