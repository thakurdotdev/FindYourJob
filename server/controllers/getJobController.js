import jobModel from "../models/jobModel.js";

const getJobController = async (req, res) => {
  try {
    const jobs = await jobModel.find({});

    res.status(200).send({
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

export default getJobController;
