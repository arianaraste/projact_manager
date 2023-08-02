import multer from "multer";
import { createUploadPath } from "./function";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback( null , createUploadPath())
    },
    filename(req, file, callback) {
        const type : string = path.extname(file.originalname);
        callback(null , Date.now() + type)
        
    },
});

export const upload : multer.Multer = multer({storage})