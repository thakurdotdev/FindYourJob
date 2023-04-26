import userModal from "../models/userModal.js";
import bcrypt from "bcryptjs";

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
    return res.send({
      success: false,
      message: "User not found",
    });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.send({
      success: false,
      message: "Invalid credentials",
    });
  }
  res.send({
    success: true,
    message: "User logged in successfully",
    user,
  });
};

export default loginController;
