import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./router/registerRoute.js";
import loginRoute from "./router/loginRoute.js";
import DataBase from "./database/conn.js";
import addJobRouter from "./router/addJobRoute.js";

const port = 5000;
dotenv.config();

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(route, loginRoute, addJobRouter);

DataBase();

app.listen(port, () => {
  console.log(`Port is Running on ${port} `);
});
