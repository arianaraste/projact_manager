import { Router } from "express";
import { checkLogin } from "../http/middleware/checkLogin";
import { ProjactController } from "../http/controller/projact.controller";
import { creatProjectValidation } from "../http/validation/projact.validation";
import ExpressValidationResult from "../http/middleware/checkError";



export const router : Router = Router();
router.post("/create" , checkLogin ,creatProjectValidation(),ExpressValidationResult,ProjactController.creatProjact)