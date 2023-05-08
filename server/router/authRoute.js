import express from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
const authRoute = express.Router();
import jwt from "jsonwebtoken";

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

authRoute.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.locals.user = null;
    res.json("Logout Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
    });
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
