import jobModel from "../models/jobModel.js";

const addJobController = async (req, res) => {
  try {
    const { company, position, workLocation, locationType } = req.body;

    if (!company || !position || !workLocation || !locationType) {
      return res.send({
        success: false,
        message: "Please Provide all details",
      });
    }

    const newJob = {
      company: company,
      position: position,
      workLocation: workLocation,
      locationType: locationType,
    };

    await jobModel.create(newJob);

    res.status(200).send({
      success: true,
      message: "Job Created Successfully",
      newJob,
    });

    console.log(newJob);
  } catch (err) {
    res.status(400).send({
      message: "Error in addJob controller",
      success: false,
      err,
    });
  }
};

export default addJobController;
