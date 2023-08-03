import multer, { ErrorCode } from "multer";
import { createUploadPath } from "./function";
import path from "path";
import { lutimes } from "fs";
import { error } from "console";
import { Error } from "mongoose";
import { Request } from "express";
multer.MulterError
const storage = multer.diskStorage({
    destination(req : Express.Request, file : Express.Multer.File, callback) {
        callback( null , createUploadPath())
    },
    filename(req : Express.Request, file : Express.Multer.File, callback) {
        let  type : string = path.extname(file.originalname);
        let format : string[] = ["jpg" , "png" , "jpeg" , "webp" , "gif"];
        const ext : string = file.originalname.split(".")?.[1];
        if(!format.includes(ext)){
        let err : Error = new Error("فرمت عکس وارد شده نا معتبر است")
        callback(err , Date.now() + type)

        }
        callback(null , Date.now() + type)
            
         
    }
});

let size : number = 2 * 1024 * 1024
export const upload : multer.Multer = multer({storage,limits:{fileSize : size}});