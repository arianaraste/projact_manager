import { Router, Request , Response } from "express";
import { checkLogin } from "../http/middleware/checkLogin";
import { UserController } from "../http/controller/user.controller";
import ExpressValidationResult from "../http/middleware/checkError";
import {validitionEditProfile } from "../http/validation/user.validation";
import fileUpload from "express-fileupload";
import {imgUpload} from "../modules/file_upload";

export const router : Router = Router();

router.get("/profile" , checkLogin , UserController.getProfile)
router.post("/profile" ,checkLogin,validitionEditProfile(), ExpressValidationResult ,UserController.editProfile);
router.post("/profile-image" ,fileUpload() ,checkLogin , imgUpload , UserController.uploadProfileImage);

