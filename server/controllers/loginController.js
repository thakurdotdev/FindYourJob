import userModal from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({
      success: false,
      message: "Please Provide the all details",
    });
  }

  const user = await userModal.findOne({ email });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "Invalid credentials",
    });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).send({
      success: false,
      message: "Invalid credentials",
    });
  }

  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});
    return res
      .cookie("token", token, {
        domain: ".landyourjob.netlify.app",
        expires: new Date(Date.now() + 86400000), // 1 day
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({
        success: true,
        message: "User logged in successfully",
        id: user._id,
        email: user.email,
      });
  }
};

export default loginController;
