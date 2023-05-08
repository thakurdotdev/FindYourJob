import express from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
const authRoute = express.Router();
import jwt from "jsonwebtoken";

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

authRoute.post("/logout", (req, res) => {
  // clear the token cookie
  res.clearCookie("token", { path: "/" });

  // expire the JWT token on the server side
  res.locals.user = null;

  // send response
  res.json("Logout Successfully");
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
