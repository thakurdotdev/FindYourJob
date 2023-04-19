import Express from "express";
import loginController from "../controllers/loginController.js";
const route = Express.Router();

route.post("/register", loginController);

export default route;
