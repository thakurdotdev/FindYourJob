import express from "express";
const addJobRouter = express.Router();
import addJobController from "../controllers/addJobController.js";

addJobRouter.post("/addjobs", addJobController);

export default addJobRouter;
