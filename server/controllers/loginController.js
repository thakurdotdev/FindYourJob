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

  // Expires in 1 day
  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

  if (isMatch) {
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token, {
        domain: "cute-erin-cobra-kit.cyclic.app",
        expires: expirationTime,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        id: user._id,
      });
  }
};

export default loginController;
