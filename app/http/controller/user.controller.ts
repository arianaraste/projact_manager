import { NextFunction, Request, Response } from "express";
import { IUser } from "../../types/Schema.Types";
import { ObjectId, UpdateWriteOpResult } from "mongoose";
import { EditProfile, Updateprofile } from "../../types/user.type";
import { body } from "express-validator";
import { UserModel } from "../../model/user.schema";
import { imageProfileValidation } from "../../modules/function";

export class UserController{
    static getProfile(req : Request , res : Response , next : NextFunction ): Response<object> | undefined{
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
            imageProfileValidation(req.file);
            console.log("!");
            
            const userId : ObjectId = req?.user?._id;
            const Imagepath : IUser["profile_image"] | undefined = req?.file?.path.substring(7);
            const uploadImage = await UserModel.updateOne({_id : userId} , {$set : {profile_image : Imagepath}});
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
    }    
    addSkil(){};
    editSkill(){};
    acceptInviteInTeam(){};
    rejectInviteInTeam(){}

}