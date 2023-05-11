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
<<<<<<< HEAD
    origin: ["http://localhost:5173", "https://landyourjob.netlify.app"],
=======
    origin: [
      "http://localhost:5173",
      "https://landyourjob.netlify.app",  
    ],
>>>>>>> 448f0a472c814cd716d44500e1d74f449278bfcb
    credentials: true,
  })
);
app.use(authRoute, jobRoute);

DataBase();

app.listen(port, () => {
  console.log(`Port is Running on ${port} `);
});
