import { Router } from "express";
import routerProducts from "./products.js";
import routerAuth from "./auth.js";
import routerCategories from "./category.js";
import imageUploadRouter from "./uploadImage.js";

const router = Router();

router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/auth", routerAuth);
router.use("/images", imageUploadRouter);

export default router;
