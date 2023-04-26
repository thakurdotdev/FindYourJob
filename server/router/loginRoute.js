import express from "express";
import loginController from "../controllers/loginController.js";
const loginRoute = express.Router();

loginRoute.post("/login", loginController);

export default loginRoute;
