import jobModel from "../models/jobModel.js";

const getJobsController = async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);

  try {
    const skip = (page - 1) * size;
    const total = await jobModel.countDocuments();
    const jobs = await jobModel.find().sort({ _id: -1 }).skip(skip).limit(size);

    res.json({
      jobs,
      total,
      page,
      size,
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
