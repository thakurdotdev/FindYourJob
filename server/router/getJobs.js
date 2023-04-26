import express from "express";
const getJobroute = express.Router();
import getJobController from "../controllers/getJobController.js";

getJobroute.get("/getJobs", getJobController);

export default getJobroute;
