import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
dotenv.config();

const { PORT, DB_URI } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(`${DB_URI}`).then(() => {
  console.log("Database connection established!");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
