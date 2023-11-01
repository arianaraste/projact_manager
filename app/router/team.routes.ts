import { Router } from "express";
import { checkLogin } from "../http/middleware/checkLogin";
import { teamValidation } from "../http/validation/team.validation";
import { TeamController } from "../http/controller/team.controller";
import ExpressValidationResult from "../http/middleware/checkError";
import { idValidation } from "../http/validation/public.validation";


export const router : Router = Router();

router.post("/create" , checkLogin , teamValidation() , ExpressValidationResult , TeamController.creatTeam)
router.get("/list" , checkLogin , TeamController.getListTeam);
router.get("/me" , checkLogin , TeamController.getMyTeam)
router.get("/invite/:teamID/:username" , checkLogin , TeamController.inviteUserToTeam);
router.get("/:id" , checkLogin , idValidation() , ExpressValidationResult , TeamController.getTeamById);
router.delete("/remove/:id" , checkLogin , idValidation() , ExpressValidationResult , TeamController.removeTeamById);
router.put("/update/:teamID" , checkLogin  , ExpressValidationResult , TeamController.updateTeam);