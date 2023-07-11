import { Router } from "express";
import routerProducts from "./products";

const router = Router();

router.use("/products", routerProducts);

export default router;
