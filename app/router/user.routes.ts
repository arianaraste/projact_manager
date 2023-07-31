import { Router } from "express";
import { checkLogin } from "../http/middleware/checkLogin";
import { UserController } from "../http/controller/user.controller";

export const router : Router = Router();

router.get("/profile" , checkLogin , UserController.getProfile)

