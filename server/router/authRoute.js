import express from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
const authRoute = express.Router();
import jwt from "jsonwebtoken";

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

authRoute.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      domain: "findyourjob.up.railway.app",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json("Logged out successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

authRoute.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) {
      res.status(401).json("Not authorized");
    }
    res.json(info);
  });
});

export default authRoute;
