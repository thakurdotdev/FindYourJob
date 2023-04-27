import jobModel from "../models/jobModel.js";

const updateJobController = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, position, workLocation, locationType } = req.body;

    if (!company || !position || !workLocation || !locationType) {
      return res.send({
        success: false,
        message: "Please Provide all details",
      });
    }

    const job = await jobModel.findOne({ _id: id });

    if (!job) return res.status(404).json({ error: "Job not found" });

    const updatedJob = await jobModel.findByIdAndUpdate(
      { _id: id },
      {
        company: company,
        position: position,
        workLocation: workLocation,
        locationType: locationType,
      }
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
