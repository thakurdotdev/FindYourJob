import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./router/loginRoute.js";
import DataBase from "./database/conn.js";

const port = 5000;
dotenv.config();

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(route);

DataBase();

app.listen(port, () => {
  console.log(`Port is Running on ${port} `);
});
