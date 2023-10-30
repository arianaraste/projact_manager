import { NextFunction, Request, Response } from "express";
import { TeamModel } from "../../model/team.schema";
import { ITeam, IUser, InviteRequest } from "../../types/Schema.Types";
import { UserModel } from "../../model/user.schema";
import { finderUserInTeam } from "../../modules/function";
import mongoose, { ObjectId, Types, isObjectIdOrHexString, isValidObjectId } from "mongoose";
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
                state  : "موفق" ,
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
            const UserId : ObjectId = req.user?._id
            
            
            const MyTeam: ITeam[] | null = await TeamModel.find({$or : [
                {owner : UserId},
                {member : UserId}
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
    
    static async inviteUserToTeam(req : Request , res : Response , next : NextFunction) : Promise<void>{
        try {
            const username : String  = req.params.username
            const teamID : Types.ObjectId = new Types.ObjectId(req.params.teamID)         
            const userID : Types.ObjectId = req.user?._id

            console.log(userID);
            
            
            
            const team : boolean = await finderUserInTeam(teamID,userID);
           
           
            if(!team)throw {status : 400 , state : "ناموفق" , message : "تیمی جهت دعوت کردن افراد یافت نشد"};
            const user : IUser | null = await UserModel.findOne({username});
            if(!user)throw {status : 400 , state : "ناموفق" , message :"کاربر مورد نظر جهت دعوت به تیم یافت نشد" };
            const inviteTeam : boolean = await finderUserInTeam(teamID , user._id);
            
            
            if(inviteTeam)throw {status : 400 , state : "ناموفق" , message : "کاربر مورد نظر قبلا در تیم عضو شد"};
            const request  = {
                caller : req.user?.username,
                requestDate : new Date(),
                teamID  ,
                status : "pending"
            }
            const updateUser = await UserModel.updateOne<IUser["inviteRequests"]>({username} , {$push : {
                inviteRequests : request
            }});
            if(updateUser.modifiedCount == 0)throw {status : 400 , state : "ناموفق" ,message : "دعوت مخاطب انجام نشد"};
            res.status(200).json({
                status : 200 ,
                state : "موفق" ,
                message : "دعوت نامه ارسال شد"
            });
            


        } catch (error) {
            next(error)
        }
    };
    static async removeTeamById(req : Request , res : Response , next : NextFunction): Promise<void>{
        try {
            const id : string = req.params.id ;
            const team: ITeam | null = await TeamModel.findById({_id : id});
            if(!team)throw{status : 404 , state : "ناموفق" , message : "تیمی یافت نشد"};
            const removeTeam = await TeamModel.deleteOne({_id : id});
            if(removeTeam.deletedCount == 0 ) throw {status : 500 , state : "ناموفق" , message : "حذف تیم انجام نشد"};
            res.status(200).json({
                status : 200 ,
                state : "موفق",
                message : "تیم حدف  شد"

            })
        } catch (error) {
            next(error)
        }
    };
    updateTeam(){};
}