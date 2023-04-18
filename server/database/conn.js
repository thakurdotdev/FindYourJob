import mongoose from "mongoose";

const DataBase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB);
    console.log("Database Connected");
  } catch (error) {
    console.log(`Error Detected ${error}`);
  }
};

export default DataBase;
