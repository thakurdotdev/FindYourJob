import jobModel from "../models/jobModel.js";
import jwt from "jsonwebtoken";

const addJobController = async (req, res) => {
  try {
    const { company, position, workLocation, locationType } = req.body;

    if (!company || !position || !workLocation || !locationType) {
      return res.send({
        success: false,
        message: "Please Provide all details",
      });
    }

    const { token } = req.cookies;

    if (!token) {
      return res.status(403).send({
        success: false,
        message: "Please login first",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) {
        res.status(401).json("Not authorized");
      }

      await jobModel.create({
        company,
        position,
        workLocation,
        locationType,
        author: info.id,
      });

      res.status(200).json({
        success: true,
        message: "Job added successfully",
      });
    });
  } catch (err) {
    res.status(400).send({
      message: "Error in addJob controller",
      success: false,
      err,
    });
  }
};

export default addJobController;
