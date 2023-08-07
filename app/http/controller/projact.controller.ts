import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { IProjact } from "../../types/Schema.Types";
import { emitWarning } from "process";
import { ProjactModel } from "../../model/projact.schema";
import { promises } from "dns";
import { get } from "http";

export class ProjactController{
    static async creatProjact(req: Request , res : Response , next : NextFunction) : Promise<void>{
        try {  
            const owner : ObjectId = req?.user?._id;
            const  {title , text , image , tags} = req.body;
            const img : IProjact["img"] = req.protocol+ "://" + req.get("host") + "/" + image.substring(7).replace(/[\\\\]/gm , "/");  
            const creatProject : IProjact = await ProjactModel.create({title , text , img , owner , tags});;
            if(!creatProject) throw {status : 400 , state : "ناموفق" , message : "پروژه ثبت نشد"};
            res.status(200).json({
                status : 200 ,
                state : "موفق",
                message : "پروژه ثبت شد" , 
                creatProject
            })
        } catch (error) {
            next(error)
        }
    };
   static async getAllProjact(req : Request , res : Response , next : NextFunction) :Promise<void>{
        try {
            const owner : ObjectId = req.user?.id;
            const getProjact : IProjact[] | null = await ProjactModel.find({owner});
            if(!getProjact)throw{status : 400 , state : "ناموفق" , message : "پروژه ایی یافت نشد"};

            res.status(200).json({
                status : 200 ,
                state : "ناموفق",
                getProjact
            })
        } catch (error) {
            next(error)

        }
    };
    static async getProjactById(req : Request , res : Response , next : NextFunction):Promise<void>{
       
        try {
            const owner : ObjectId = req.user?.id;
            const id : string = req.params.id;
            const findProject : IProjact | null  = await ProjactModel.findOne({owner , _id : id});
            if(!findProject)throw {status : 400 , state : "ناموفق" , message : "پروژه ایی یافت نشد"};
            res.status(200).json({
                status : 200 ,
                state : "موفق",
                findProject
            })
            
        } catch (error) {
            next(error)
        }

    };
    static async removeProjact(req : Request , res : Response , next : NextFunction):Promise<void>{
        try {
            const owner : ObjectId = req.user?.id;
        const id : string = req.params.id;
        const findProject : IProjact | null  = await ProjactModel.findOne({owner , _id : id});
        if(!findProject)throw {status : 400 , state : "ناموفق" , message : "پروژه ایی یافت نشد"};
        const removeProjact  = await ProjactModel.deleteOne({_id : id});
        if(removeProjact.deletedCount == 0)throw {status : 400 , state : "ناموفق" , message : "پروژه حذف نشد"};
        res.status(200).json({
            status : 200 ,
            state : "موفق",
            message : "پروژه  حذف شد"
        })
        } catch (error) {
            next(error)
        }
    };
    getProjactOfTeam(){};
    getProjactOfUser(){};
    updateProjact(){};
} 