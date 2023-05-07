import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
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
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("jobs", jobSchema);
