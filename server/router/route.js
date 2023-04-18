import Express from "express";
import { home } from "../controllers/controller.js";

const route = Express.Router();

route.get("/", home);

export default route;
