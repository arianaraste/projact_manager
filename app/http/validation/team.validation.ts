import { body } from "express-validator";
import { TeamModel } from "../../model/team.schema";

export const teamValidation = ()=>[
    body("name").isLength({min : 5}).withMessage("نام تیم نمی تواند خالی باشد"),
    body("description").notEmpty().withMessage("توضیحات تیم نمی تواند خالی باشد"),
    body("username").custom(async(username : string)=>{
        const usernameRegexp : RegExp = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
        if(usernameRegexp.test(username)){
            const usernameFinder = await TeamModel.findOne({username});
            if(usernameFinder)throw "نام کابربری قبلا استفاده شده است";
            return true
        }
        throw "نام کاربری را به طور صحیح ایجاد کنید";
    })
];