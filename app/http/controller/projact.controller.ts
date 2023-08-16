import { NextFunction, Request, Response, response } from "express";
import { ObjectId } from "mongoose";
import { IProjact } from "../../types/Schema.Types";
import { ProjactModel } from "../../model/projact.schema";
import { lutimesSync } from "fs";
import { UpdateProject } from "../../types/General.type";
import { createLinkforFile } from "../../modules/function";


export class ProjactController{
    static async creatProjact(req: Request , res : Response , next : NextFunction) : Promise<void>{
        try {  
            const owner : ObjectId = req?.user?._id;
            const  {title , text , image , tags} = req.body;
            const img : IProjact["img"] = createLinkforFile(image , req) 
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
            for (const projact of getProjact) {
                projact.img == createLinkforFile(projact.img , req)
            }

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
            findProject?.img == createLinkforFile(findProject?.img , req)
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
    static async updateProjact(req: Request , res : Response , next : NextFunction) : Promise<void>{
        try {
        const owner : ObjectId = req.user?._id;
        const id : string = req.params.id;
        const findProject : IProjact | null  = await ProjactModel.findOne({owner , _id : id});
        if(!findProject)throw {status : 400 , state : "ناموفق" , message : "پروژه ایی یافت نشد"};
        const data = req.body;
        const badvValue : any[] = ["" , " " , 0 , undefined , NaN , null];
        const updateKey : string[] = ["title" ,  "text" , "tags"];
        
        (Object.keys(data) as (keyof typeof data)[]).forEach((key,index)=>{
           
            if(updateKey.includes(data)) delete data[key]
            if(badvValue.includes(data[key])) delete data[key];
        });
        const tag : string[] = data.tags.split(" ");
        data.tags = tag 
    
        const UpdateResult = await ProjactModel.updateOne<UpdateProject>({_id : id} , {$set : data});
        if(UpdateResult.modifiedCount == 0)throw {status : 400 , state : "نامفق" , message : "بروزرسانی انجام نشد"};
        res.status(200).json({
            status : 200 ,
            state : "موفق" ,
            message : "بروزرسانی انجام شد"
        });
               

        } catch (error) {
            next(error)
        }
        
    };
    static async updateProjectImg(req : Request , res : Response , next:NextFunction) : Promise<void>{
        try {
        
        const image : string = createLinkforFile(req.body.image , req)
        const owner : ObjectId = req.user?._id;
        const id : string = req.params.id;
        const findProject : IProjact | null  = await ProjactModel.findOne({owner , _id : id});
        if(!findProject)throw {status : 400 , state : "ناموفق" , message : "پروژه ایی یافت نشد"};
        const UpdateResult = await ProjactModel.updateOne<IProjact["img"]>({_id : id} , {$set : {img : image} })
        if(UpdateResult.modifiedCount == 0)throw {status : 400 , state : "نامفق" , message : "بروزرسانی انجام نشد"};
        res.status(200).json({
            status : 200 ,
            state : "موفق" , 
            message : "بروزرسانی انجام شد"
        });
               
        } catch (error) {
            next(error)
        }
    }
    getProjactOfTeam(){};
    getProjactOfUser(){};
} 