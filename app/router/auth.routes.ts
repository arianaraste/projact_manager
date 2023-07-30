import { Router } from "express";
import { ValidationLogin, ValidationRegister } from "../http/validation/auth.validation";
import { AuthController } from "../http/controller/auth.controller";
import ExpressValidationResult from "../http/middleware/checkError"
export const router : Router = Router();

router.post("/register" , ValidationRegister(),ExpressValidationResult,AuthController.Register);
router.post("/login" , ValidationLogin(),ExpressValidationResult,AuthController.Login)