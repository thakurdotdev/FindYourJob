import mongoose from "mongoose";

const jobSchema = new mongoose.userSchema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    workLocation: {
      type: String,
      default: "Rajkot",
      required: true,
    },
    locationType: {
      type: String,
      default: "Remote",
    },
  },
  { timestamps: true }
);

export default mongoose.model("", jobSchema);