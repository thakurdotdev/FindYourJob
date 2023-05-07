import jobModel from "../models/jobModel.js";

const getJobsController = async (req, res) => {
  try {
    const jobs = await jobModel
      .find({})
      .populate("author", ["name"])
      .sort({ createdAt: -1 })
      .limit(30);

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (err) {
    res.status(400).send({
      message: "Error in getJob controller",
      success: false,
      err,
    });
  }
};

export default getJobsController;
