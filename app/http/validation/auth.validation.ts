import { NextFunction, Request, Response } from "express";
import { ValidationChain, body } from "express-validator";
import { IUser } from "../../types/Schema.Types";
import { UserModel } from "../../model/user.schema";

export const ValidationRegister = ()=>[
body("username").custom(async (value : string)=>{
    if(value){
        const usernameRegex : RegExp = /^[a-z]+[a-z0-9\_\.]{2,}/gi
        if(usernameRegex.test(value)){
            const usernameFinder : IUser["username"] | null = await UserModel.findOne({username : value});
            if(usernameFinder)throw "نام کاربری قبلا استفاده شده است"
            return true
        }
        throw "نام کاربری معتبر نباشد"
    }
    throw "نام کابری نمی تواند خالی باشد";
}),
body("email").isEmail().withMessage("ایمیل وارد شد معتبر نیست").custom(async email =>{
    const emailFinder : IUser["email"] | null = await UserModel.findOne({email});
    if(emailFinder)throw  "ایمیل کاربری قبلا استفاده شده است"
    return true
}) ,
body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل وارد شده معتبر نیست").custom(async mobile => {
    const mobileFinder : IUser["mobile"] | null = await UserModel.findOne({mobile});
    if(mobileFinder)throw "شماره موبایل کاربربی قبلا استفاده شده است"
}),
body("password").isLength({min : 6 , max : 16}).withMessage("رمز عبور حداقل 6 و حداکثر 16 کارکتر میباشد").custom((value :string , {req})=>{
    if(!value) throw "رمز عبور نمیتواند خالی باشد";
    if(value !== req?.body?.confirm_password) throw "رمز عبور با تاییدیه آن یکسان نمی باشد";
    
    })
];
export const ValidationLogin = () => [
    body("username").notEmpty().withMessage("نام کاربری نمی تواند خالی باشد").custom(username => {
        const usernameRegex : RegExp = /^[a-z]+[a-z0-9\_\.]{2,}/gi
        if(usernameRegex.test(username)){
            return true
        }throw "نام کاربری صحیح نمی بباشد";
        
    }),
    body("password").isLength({min : 6 , max : 16}).withMessage("رمز عبور حداقل 6 و حداکثر 16 کارکتر میباشد")
];



