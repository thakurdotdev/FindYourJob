import userModal from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModal.findOne({ email });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "Invalid Email",
    });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(402).send({
      success: false,
      message: "Invalid Password",
    });
  }

  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});
    return res
      .cookie("token", token, {
        domain: "job-portal-app-kzk0.onrender.com",
        expires: new Date(Date.now() + 86400000), // 1 day
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        name: user.name,
        email: user.email,
      });
  }
};

export default loginController;
