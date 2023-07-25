import { Router } from "express";
import routerProducts from "./products.js";
import routerAuth from "./auth.js";

const router = Router();

router.use("/products", routerProducts);
router.use("/auth", routerAuth);

export default router;
