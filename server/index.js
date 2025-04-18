import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis } from "./data/data.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

  
    //await mongoose.connection.db.dropDatabase();
    //await KPI.insertMany(kpis);
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
