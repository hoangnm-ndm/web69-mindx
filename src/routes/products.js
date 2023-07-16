import { Router } from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/products.js";

const routerProducts = Router();

routerProducts.get("/", getAll);
routerProducts.get("/:id", getDetail);
routerProducts.post("/", create);
routerProducts.put("/:id", update);
routerProducts.delete("/:id", remove);

export default routerProducts;
