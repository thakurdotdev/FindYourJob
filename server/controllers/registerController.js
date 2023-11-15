import userModal from "../models/userModal.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  try {
    const { name, email, password, profilePic, resume } = req.body;

    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(409).send({
        success: true,
        message: "Email is already there",
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const hashPassword = bcrypt.hashSync(password, salt);

    const userData = {
      name: name,
      email: email,
      password: hashPassword,
      profilePic: profilePic,
      resume: resume,
    };

    console.log(userData);
    await userModal.create(userData);
    res.status(200).send({
      success: true,
      message: "User account created successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: "Error in register controller",
      success: false,
      err,
    });
  }
};

export default registerController;
