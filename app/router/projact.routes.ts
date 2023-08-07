import { Router } from "express";
import { checkLogin } from "../http/middleware/checkLogin";
import { ProjactController } from "../http/controller/projact.controller";
import { creatProjectValidation } from "../http/validation/projact.validation";
import ExpressValidationResult from "../http/middleware/checkError";
import { imgUpload } from "../modules/file_upload";
import fileUpload from "express-fileupload";



export const router : Router = Router();
router.post("/create" ,fileUpload(), checkLogin ,creatProjectValidation(),ExpressValidationResult,imgUpload,ProjactController.creatProjact);
router.get("/get" , checkLogin ,ProjactController.getAllProjact)