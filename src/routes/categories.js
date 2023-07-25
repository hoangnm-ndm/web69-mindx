import { Router } from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { create, getAll, getDetail, remove, update } from "../controllers/categories.js";

const routerCategories = Router();

routerCategories.get("/", getAll);
routerCategories.get("/:id", getDetail);
routerCategories.post("/",checkPermission, create);
routerCategories.put("/:id",checkPermission, update);
routerCategories.delete("/:id",checkPermission, remove);

export default routerCategories;
