import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { IProjact } from "../../types/Schema.Types";
import { emitWarning } from "process";
import { ProjactModel } from "../../model/projact.schema";
import { promises } from "dns";

export class ProjactController{
    static async creatProjact(req: Request , res : Response , next : NextFunction) : Promise<void>{
        try {  
            const owner : ObjectId = req?.user?._id;
            const  {title , text } = req.body;
            const creatProject : IProjact = await ProjactModel.create({title , text , owner});;
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
    getAllProjact(){};
    getProjactById(){};
    getProjactOfTeam(){};
    getProjactOfUser(){};
    updateProjact(){};
    removeProjact(){};
} 