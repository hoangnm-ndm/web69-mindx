import { Router } from "express";
import { signIn, signUp } from "../controllers/auth";
import { checkPermission } from "../middlewares/checkPermission";

const routerAuth = Router();


routerAuth.post("/signup", signUp);
routerAuth.post("/signin", signIn);
routerAuth.put("/user/:id",checkPermission, updateUser);

// role = member -> role -> btv
export default routerAuth;
