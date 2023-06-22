import jobModel from "../models/jobModel.js";

const getJobsController = async (req, res) => {
  try {
    const jobs = await jobModel.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
    console.log("Jobs fetched successfully");
  } catch (err) {
    res.status(400).send({
      message: "Error in getJob controller",
      success: false,
      err,
    });
  }
};

export default getJobsController;
