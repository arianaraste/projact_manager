import { Router } from "express";
import { checkLogin } from "../http/middleware/checkLogin";
import { teamValidation } from "../http/validation/team.validation";
import { TeamController } from "../http/controller/team.controller";
import ExpressValidationResult from "../http/middleware/checkError";


export const router : Router = Router();

router.post("/create" , checkLogin , teamValidation() , ExpressValidationResult , TeamController.creatTeam)
router.get("/list" , checkLogin , TeamController.getListTeam)