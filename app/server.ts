import express, { NextFunction, Request, Response, request } from "express"
import { Application } from "express";
import { STATUS_CODES, Server } from "http";
import path, { dirname } from "path";
import http from "http";
import mongoose, { Mongoose } from "mongoose"
import { ERR_Type } from "./types/General.type";
import {router as AllRoutes} from "./router/routes"

export class ApplicationClass {
    private app : Application = express();
    private server : Server = http.createServer(this.app)
    constructor(PORT : number , DB_URL : string){
        this.configDB(DB_URL);
        this.configApplicatioon();
        this.configServer(PORT);
        this.createRouter();
        this.errorHandler();
    };
    configApplicatioon() {
        this.app.use(express.urlencoded({extended : true}));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname , ".." , "public")));
    };
    configServer(PORT : number){
        this.server.listen(PORT , ()=>{
            console.log(`server run on port ${PORT} : ` + `http://localhost:${PORT}`)
        }
      )
    };
    configDB(DB_URL : string) {
        mongoose.connect(DB_URL).then(()=>{
            console.log("connected to DB");
            
        }).catch((err : any)=>{
            const DB_Error : ERR_Type = {
                err_type : "DB ERROR" , 
                status : err?.status ,
                message : err?.message
            };
            console.log(DB_Error);
            ;
        });
    };
    createRouter(){
      
        this.app.use(AllRoutes)
        this.app.get("/",(req : Request , res : Response , next : NextFunction)=>{    
        return res.json({message : "this is new Express application"})})
        
    };
    errorHandler(){    
        this.app.use((req : Request , res : Response , next : NextFunction)=>{
            const NotFundErr : ERR_Type = {
                err_type : " not fund page ",
                status :  +STATUS_CODES||404 ,
                message : `صفحه مورد نظر یافت نشد  ${req.url}`
            };
            return res.json(NotFundErr)
        });
        this.app.use((err : any , req : Request , res : Response , next : NextFunction)=>{
            
            
            const ServerERR : ERR_Type = {
                err_type : "Server Error",
                status : err?.status || 500 ,
                message : err?.message ,
            };
            return res.json(ServerERR)
        })
    };
    
};