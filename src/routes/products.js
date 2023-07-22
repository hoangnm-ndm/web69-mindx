import { Router } from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/products.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const routerProducts = Router();

routerProducts.get("/", getAll);
routerProducts.get("/:id", getDetail);
routerProducts.post("/",checkPermission, create);
routerProducts.put("/:id",checkPermission, update);
routerProducts.delete("/:id",checkPermission, remove);

export default routerProducts;
