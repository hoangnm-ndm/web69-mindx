import { Router } from "express";
import routerProducts from "./products.js";
import routerAuth from "./auth.js";
import routerCategories from "./categories.js";

const router = Router();

router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/auth", routerAuth);

export default router;
