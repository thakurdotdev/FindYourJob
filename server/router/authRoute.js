import express from "express";
import registerController from "../controllers/registerController.js";
import loginController from "../controllers/loginController.js";
const authRoute = express.Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

export default authRoute;
