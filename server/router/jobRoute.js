import express from "express";
import addJobController from "../controllers/addJobController.js";
import getJobController from "../controllers/getJobController.js";
import updateJobController from "../controllers/updateJobController.js";
import deleteJobController from "../controllers/deleteJobController.js";

const jobRoute = express.Router();

jobRoute.post("/addJobs", addJobController);

jobRoute.get("/getJobs", getJobController);

jobRoute.patch("/updateJob/:id", updateJobController);

jobRoute.delete("/deleteJob/:id", deleteJobController);

export default jobRoute;
