import { NextFunction, Request, Response } from "express";
import { RegisterUser } from "../../types/auth.type";
import { Result, ValidationError, validationResult } from "express-validator";
import { hashString, tokenGenreator } from "../../modules/function";
import { IUser } from "../../types/Schema.Types";
import { UserModel } from "../../model/user.schema";
import { log } from "console";
import { compareSync } from "bcrypt";
import { promises } from "readline";

export class AuthController {
    
    static async Register(req : Request , res : Response , next : NextFunction):  Promise<void>{
      try {
        const body : IUser = req.body;
        const hashPass : string  = hashString(body?.password);
        body.password = hashPass;
        const User : IUser = await UserModel.create(body)
        res.send(User)
        
        
      } catch (error) {
        next(error)
      }
       

    };
    
    
    static async Login(req : Request , res : Response , next : NextFunction): Promise<void>{
      try {
      const { username , password } = await req.body;
      const userFinder : IUser | null  = await UserModel.findOne({username});
      if(!userFinder)throw {status : 401 , state : "ناموفق" , message :" نام کاربری یا رمز عبور نا معتبر است"};
      const comparePass = compareSync(password , userFinder.password);
      if(!comparePass)throw {status : 401 , state : "ناموفق" , message :" نام کاربری یا رمز عبور نا معتبر است"};
      const token : string = tokenGenreator(username);
      userFinder.token = token ;
      await userFinder.save();
      console.log(userFinder);
      
      res.status(200).json({
        status : 200 ,
        state : "موفق" ,
        message : "احراز هویت با موفیقیت انجام شد",
        token
      })
    } catch (error) {
        next(error)
      }
    };
    resetPassword(){};
  }
