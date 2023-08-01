import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { EditProfile } from "../../types/user.type";
import { IUser } from "../../types/Schema.Types";

export const validitionEditProfile = ()=>[
    body("firstname").trim().isAlpha().withMessage("مقدار نام نامعتبر"),
    body("lastname").trim().isAlpha().withMessage("مقدارنام خانوادگی نامعتبر"),
    body("skills").trim().custom(async (value : string) => {
        const newSkills = value.split(" ");
        if(newSkills[0] == "" )throw "مقدار مهارت نا معتبر";
        if(newSkills.length < 1 )throw "مقدار مهارت نا معتبر";
        return true
    })
]       