import express from "express";
import addJobController from "../controllers/addJobController.js";
import getJobsController from "../controllers/getJobsController.js";
import updateJobController from "../controllers/updateJobController.js";
import deleteJobController from "../controllers/deleteJobController.js";
import getOneJobController from "../controllers/getOneJobController.js";

const jobRoute = express.Router();

jobRoute.get("/", (req, res) => {
  res.send("Welcome to the Find Your Job API");
});

jobRoute.post("/addJobs", addJobController);

jobRoute.get("/getJobs", getJobsController);

jobRoute.patch("/updateJob/:id", updateJobController);

jobRoute.delete("/deleteJob/:id", deleteJobController);

jobRoute.get("/job/:id", getOneJobController);

export default jobRoute;
