import jobModel from "../models/jobModel.js";

const getJobsController = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Parse the page query parameter, default to page 1
  const itemsPerPage = 10; // Adjust this to your preferred items per page

  try {
    const skip = (page - 1) * itemsPerPage;
    const jobs = await jobModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage);

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
