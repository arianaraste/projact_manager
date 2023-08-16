import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { TeamModel } from "../../model/team.schema";
import { ITeam } from "../../types/Schema.Types";
import { throws } from "assert";

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
        try {
            const teams : ITeam[] | undefined = await TeamModel.find({});
            if(!teams)throw {status : 400 , state : "ناموفق" , message : "تیمی یافت نشد"};
            res.status(200).json({
                status : 200 ,
                state : "موفق",
                teams
            })

        } catch (error) {
            next(error)
        }
    };
    static async getTeamById(req : Request , res : Response , next : NextFunction) : Promise<void>{
        try {
            const id : string = req.params.id;
            const team : ITeam | null = await TeamModel.findOne({_id : id});
            if(!team)throw {status : 404 , state : "ناموفق" , message : "تیمی یافت نشد"};
            res.status(200).json({
                status : 200 , 
                state : "موفق",
                team
            })
        } catch (error) {
            next(error)
        }
    };
    static async getMyTeam(req : Request , res  :Response , next : NextFunction ): Promise<void>{
        try {
            const userId : string = req.params.id;
            const MyTeam: ITeam[] | null = await TeamModel.find({$or : [
                {owner : userId},
                {member : userId}
            ]})
            if(!MyTeam)throw{status : 404 , state : "ناموفق" , message : "شما عضو تیمی نیستید"};
            res.status(200).json({
                status : 200 ,
                state : "موفق",
                MyTeam
            })
        } catch (error) {
            next(error)
        }
    };
    inviteUserToTeam(){};
    removeTeamByIdOf(){};
    updateTeam(){};
}