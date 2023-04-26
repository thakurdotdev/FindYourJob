import mongoose from "mongoose";

const DataBase = async () => {
  try {
    await mongoose.connect(process.env.MongoDB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Error Detected ${error}`);
  }
};

export default DataBase;
