import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./router/authRoute.js";
import DataBase from "./database/conn.js";
import jobRoute from "./router/jobRoute.js";

const port = 5000;
dotenv.config();

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(authRoute, jobRoute);

DataBase();

app.listen(port, () => {
  console.log(`Port is Running on ${port} `);
});
