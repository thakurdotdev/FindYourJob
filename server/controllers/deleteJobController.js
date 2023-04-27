import jobModel from "../models/jobModel.js";

const deleteJobController = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await jobModel.findById({ _id: id });

    if (!job) {
      res.status(404).json("Job Not Found");
    }

    await jobModel.findByIdAndDelete({ _id: id });

    res.status(200).json("Job Deleted Successfully");
  } catch (err) {
    console.log(`Error Found ${err}`);
  }
};

export default deleteJobController;
