import { NextFunction, Request, Response } from "express";
import { IUser, InviteRequest } from "../../types/Schema.Types";
import { ObjectId, Types, UpdateWriteOpResult } from "mongoose";
import { EditProfile, Updateprofile } from "../../types/user.type";
import { body } from "express-validator";
import { UserModel } from "../../model/user.schema";
import { createLinkforFile } from "../../modules/function";
import { types } from "util";


export class UserController{
    static getProfile(req : Request , res : Response , next : NextFunction ): Response<object> | undefined{
        try {
            const user : IUser | undefined = req.user 
            if(!user)throw {status : 400 , state : "ناموفق" , message : "کاربری یافت نشد"}   
            user?.profile_image == createLinkforFile(user?.profile_image , req)
            return res.status(200).json({
                status : 200 ,
                statae : "موفق" ,
                user
            });


        } catch (error) {
            next(error)
        }
    }
    static async editProfile(req : Request , res : Response , next : NextFunction):Promise<void>{
        try {
            const {firstname , lastname , skills} : EditProfile = req.body ;
            const UserID : IUser["_id"] = req?.user?._id;
            let arraySkills : string[] = skills.split(" ");
            const newbody : Updateprofile = {
                firstname ,
                lastname ,
                skills : arraySkills
            };
            console.log(newbody);
            const UpdateProfile : UpdateWriteOpResult  = await UserModel.updateOne({_id : UserID} , {$set : newbody});
            
            
            if(UpdateProfile.modifiedCount > 0 ){
                res.status(200).json({
                    status : 200,
                    state : "موفق" ,
                    message : "بروزرسانی پروفایل با موفقیت انجام شد"

                })
            }throw {status :400 , state:"ناموفق", message :"بروزرسانی انجام نشد"}
        
        } catch (error) {
            next(error)            
        }
    };
    static async uploadProfileImage(req : Request , res : Response , next : NextFunction): Promise<void> {
        try {
            
            const userId : ObjectId = req?.user?._id;
            const Image : string = createLinkforFile(req.body.image , req)     
            const uploadImage = await UserModel.updateOne<IUser["profile_image"]>({_id : userId} , {$set : {profile_image : Image}});
            console.log(uploadImage.modifiedCount);
            if(uploadImage.modifiedCount == 0)throw {status : 400 , state : "ناموفق" , message : "عکس پروفایل بارگذاری نشد"};
            res.status(200).json({
                status : 200 ,
                state : "موفق" ,
                message : "عکس پروفایل با موفقیت بارگذاری شد"
            })
            
        } catch (error) {
           next(error) 
        }
    };
    static async getAllRequest(req : Request , res : Response , next : NextFunction){
        try {
            const user : ObjectId = req.user?._id;
            const requests : IUser["inviteRequests"] | null = await UserModel.aggregate([
                {
                    $match : {_id : user}
                },
                {
                    $project : {inviteRequests : 1}
                },
                {
                    $lookup : {
                        from : "users" ,
                        localField : "inviteRequests.caller" ,
                        foreignField : "username",
                        as : "inviteRequest.caller"
                    }
                }
            ]);
        
            
            return res.json({
                requests 
            })
        } catch (error) {
            next(error)
        }
    };
    static async getRequestByStatus(req : Request , res : Response , next : NextFunction){
        const status : string = req.params.status ; 
        const userID : ObjectId = req.user?._id;
        const requests : IUser["inviteRequests"] | null = await UserModel.aggregate([
            {
                $match : {_id : userID}
            },
            {
                $project : {
                    _id   : 0 ,
                    requests :  { 
                        $filter  : {
                            input :  "$inviteRequests" ,
                            as : "request" ,
                            cond : {
                                $eq : ["$$request.status" , status]
                            }
                        }
                    }

                }
            }
        ]);
        return res.status(200).json({
            status : 200 , 
            state : "موفق" ,
            requests
        })

    }
    static async changeStatusRequrest(req : Request , res : Response , next : NextFunction){
        try {
            const id : Types.ObjectId = new Types.ObjectId(req.params.id)
            const status : string = req.params.status;
            console.log(id);
            console.log(status);
            
            
            const request = await UserModel.findOne({"inviteRequests._id" : id})
            console.log(request);
            
            if(!request) throw {status : 404 , message : "درخواستی با این مشخصات یافت نشد"};
            const findRequest : InviteRequest | undefined = request.inviteRequests.find (iteam => iteam.id == id);
            if(findRequest?.status !== "pending") throw {status : 400 , mesage : "این درخواست ثبلا جپذریفته یا رد شده است"};
            if(!["accepted" , "rejected"].includes(status)) throw{status : 400 , message : "اطلاعات ارسال شده صحیح نمی باشد"};
            const updateResult = await UserModel.updateOne({"inviteRequests._id" : id} , {
                $set : {"inviteRequests.$.status" : status}
            });
            if(updateResult.modifiedCount == 0) throw {status : 500 , message : "تغییر وضعیت درخواست انجام نشد"};
            return res.status(200).json({
                status : 200 ,
                state : "موفق",
                message : "تغییر وضعیت درخواست با موفقیت انجام شد"
            });

        } catch (error) {
            next(error)
        }
    }    
    addSkil(){};
    editSkill(){};
    acceptInviteInTeam(){};
    rejectInviteInTeam(){}

}