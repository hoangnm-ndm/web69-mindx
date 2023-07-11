import express from "express";
import dotenv from "dotenv";
import router from "./routes";

const app = express();
dotenv.config();

const { PORT } = process.env;
// destructuring

app.use(express.json());

// app.get("/products", getAll);
// app.get("/products/:id", getDetail);
// app.post("/products", create);
// app.put("/products/:id", update);
// app.delete("/products/:id", remove);

app.use("/", router);

// categories, comments, feedback, about, users, ....

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
