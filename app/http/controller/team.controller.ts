import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { TeamModel } from "../../model/team.schema";

export class TeamController {
    static async creatTeam(req : Request , res : Response , next : NextFunction) : Promise<void>{
        try {

            const owner : ObjectId = req.user?._id;
            const {
                name ,
                description ,
                username 
            } = req.body;
            const createTeam = await TeamModel.create({name , description , username , owner});
            if(!createTeam)throw {status : 500 , state : "ناموفق" , message : "ایجاد تیم با مشکل مواجه شد"};
            res.status(201).json({
                status : 201 ,
                state  : "ناموفق" ,
                message : "تیم ایجاد شد"
            })            
        } catch (error) {
            next(error)
        }
    };
    static async getListTeam(req : Request , res : Response , next : NextFunction) : Promise<void>{
        
    };
    inviteUserToTeam(){}
    removeTeamByIdOf(){};
    updateTeam(){};
}