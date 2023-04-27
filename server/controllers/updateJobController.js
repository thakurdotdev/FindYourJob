import jobModel from "../models/jobModel.js";

const updateJobController = async (req, res) => {
  try {
    const { id } = req.params;
    const { position, workLocation } = req.body;

    if (!position || !workLocation) {
      res.json("Please Provide All Details");
    }

    const job = await jobModel.findOne({ _id: id });

    if (!job) return res.status(404).json({ error: "Job not found" });

    const updatedJob = await jobModel.findByIdAndUpdate(
      { _id: id },
      { position, workLocation }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export default updateJobController;
