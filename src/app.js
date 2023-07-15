import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const { PORT } = process.env;
// destructuring

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/web69").then(() => {
  console.log("Database connection established!")
})

app.use("/api", router);

// categories, comments, feedback, about, users, ....

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
