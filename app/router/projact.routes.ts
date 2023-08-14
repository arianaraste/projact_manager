import { Router } from "express";
import { checkLogin } from "../http/middleware/checkLogin";
import { ProjactController } from "../http/controller/projact.controller";
import { creatProjectValidation } from "../http/validation/projact.validation";
import ExpressValidationResult from "../http/middleware/checkError";
import { imgUpload } from "../modules/file_upload";
import fileUpload from "express-fileupload";
import { idValidation } from "../http/validation/public.validation";



export const router : Router = Router();
router.post("/create" ,fileUpload(), checkLogin ,creatProjectValidation(),ExpressValidationResult,imgUpload,ProjactController.creatProjact);
router.get("/list" , checkLogin ,ProjactController.getAllProjact);
router.get("/get/:id" , checkLogin, idValidation() , ExpressValidationResult ,ProjactController.getProjactById)
router.get("/remove/:id" , checkLogin, idValidation() , ExpressValidationResult ,ProjactController.removeProjact)
router.put("/update/:id" , checkLogin, idValidation() , ExpressValidationResult ,ProjactController.updateProjact)