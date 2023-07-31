import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/Schema.Types";

export class UserController{
    static getProfile(req : Request , res : Response , next : NextFunction ){
        try {
            const user : Express.User | undefined = req.user;
            return res.status(200).json({
                status : 200 ,
                statae : "موفق" ,
                user
            });


        } catch (error) {
            next(error)
        }
    }
    editProfile(){};
    addSkil(){};
    editSkill(){};
    acceptInviteInTeam(){};
    rejectInviteInTeam(){}

}