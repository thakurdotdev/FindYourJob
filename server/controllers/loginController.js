import userModal from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists
  const user = await userModal.findOne({ email });
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "Invalid Email",
    });
  }

  // Compare the password
  const isMatch = bcrypt.compareSync(password, user.password);

  // If the password is invalid
  if (!isMatch) {
    return res.status(400).send({
      success: false,
      message: "Invalid Password",
    });
  }

  // If the password is valid
  if (isMatch) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePic: user.profilePic,
        resume: user.resume,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: "findyourjob.azurewebsites.net",
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
      });
  }
};

export default loginController;
