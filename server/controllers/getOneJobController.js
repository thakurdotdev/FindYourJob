import jobModel from "../models/jobModel.js";

const getOneJobController = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await jobModel.findOne({ _id: id });
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export default getOneJobController;
