import { NextFunction, Request, Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import { TypeFormatFlags } from "typescript";
import { createUploadPath } from "./function";


export async function imgUpload(req:Request , res:Response , next : NextFunction ): Promise<void> {
    
    try {
        let file : UploadedFile | undefined = <UploadedFile>req?.files?.image;
        if(!file)throw {status : 400 , state : "ناموفق" , message : "لطفا عکس مورد نظر را ارسال کنید"};
        let format : string[] = ["jpg" , "png" , "jpeg" , "webp" , "gif"];
        const ext : string = file.name.split(".")?.[1];
        if(!format.includes(ext))throw{status : 400 , state : "ناموفق" , message : "فرمت عکس وارد شده نا معتبر است"}
        if(file.size > 2 *1024 * 1024 )throw {status : 400 , state : "ناموفق" , message : "حجم عکس بیش از 2 مگ میباشد"}
        let image_path : string = path.join(createUploadPath() +( Date.now() + path.extname(file.name)));
        req.body.image = image_path
        let upload_path : string = path.join(__dirname , ".." , ".." , image_path);
        file.mv(upload_path , (err)=>{
            console.log(err);
            if(err) throw {status : 400 , state : "ناموفق" , message :"بارگزاری عکس انجام نشد"};
            next()
            
        })
        
        
        

    } catch (error) {
    next(error)
    }

};