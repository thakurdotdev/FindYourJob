import Express from "express";
import route from "./router/route.js";
import cors from "cors";
import DataBase from "./database/conn.js";
import dotenv from "dotenv";

dotenv.config();

const app = Express();
app.use(cors());
// app.use(Express.json());

app.use(route);

DataBase();

const port = 5000;

app.listen(port, () => {
  console.log(`Port is Running on ${port} `);
});
