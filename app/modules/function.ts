import { genSaltSync, hashSync } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { General } from "../types/enum";
import fs from "fs"
import path from "path";
import { Request,NextFunction, Response } from "express";

export function hashString(str : string) : string {
    const salt : string = genSaltSync(10);
    return hashSync(str , salt);
};

export function tokenGenreator(payload : string): string{
    const token : string = sign(payload , General.SECRET_KEY);
    return token
};
export function verifyToken(token : string):  JwtPayload | string {
    const result : JwtPayload | string = verify(token , General.SECRET_KEY);
    if(!result)throw {status : 401 , message : "لطفا وارد حساب کاربری خود شوید"};
    return result
};
export function createUploadPath(): string{
    let date : Date = new Date();
    const day : string = ""+date.getDate();
    const month : string = ""+date.getMonth();
    const year : string = ""+date.getFullYear();
    const uploadPath : string = path.join(__dirname,".." , ".." , "public" , "upload" , year , month , day);
    fs.mkdirSync(uploadPath , {recursive : true});
    return path.join("public" , "upload" , year , month , day)
    
};
// export  function imageProfileValidation(data : Express.Multer.File | undefined):void{
//     if(typeof data == "undefined")throw{status : 400 , state : "ناموفق" , message : "لطفا عکس مورد نظر خود را وارد کنید"};
//     return
// };


