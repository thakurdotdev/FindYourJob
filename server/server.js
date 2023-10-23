import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./router/authRoute.js";
import DataBase from "./database/conn.js";
import jobRoute from "./router/jobRoute.js";
import cookieParser from "cookie-parser";

const port = 5000;
dotenv.config();

const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://findyourjob.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(authRoute, jobRoute);

async function startServer() {
  try {
    await DataBase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
