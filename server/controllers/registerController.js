import userModal from "../models/userModal.js";
import bcrypt from "bcryptjs";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.send({ success: false, message: "Please Provide the name" });
    }
    if (!email) {
      return res.send({ success: false, message: "Please Provide the email" });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Please Provide the password",
      });
    }

    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
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
