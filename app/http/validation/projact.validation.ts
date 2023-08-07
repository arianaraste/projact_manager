import { body } from "express-validator";

export const creatProjectValidation = () => [
    body("title").notEmpty().withMessage("لطفا عنوان پروژه را وارد کنید"),
    body("text").notEmpty().isLength({min : 20}).withMessage("لطفا توضیحات پروژه را وارد کنید , توضیحات کمتر از 20 کلمه موررد تایید نیست"),
    body("tags").isArray({min : 0 , max : 10}).withMessage("حداکثر تعداد برچسب 10  عدد میباشد")
]