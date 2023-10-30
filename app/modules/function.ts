import { genSaltSync, hashSync } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { General } from "../types/enum";
import fs from "fs"
import path from "path";
import { Request,NextFunction, Response, request } from "express";
import { ITeam, IUser } from "../types/Schema.Types";
import { TeamModel } from "../model/team.schema";
import mongoose, { ObjectId, Types } from "mongoose";

export function hashString(str : string) : string {
    const salt : string = genSaltSync(10);
    return hashSync(str , salt);
};

export function tokenGenreator(payload : string): string{
    const token : string = sign(payload , General.SECRET_KEY);
    return token
};
export function verifyToken(token : string):  JwtPayload | string {
    const result : JwtPayload | string = verify(token , General.SECRET_KEY);
    if(!result)throw {status : 401 , message : "لطفا وارد حساب کاربری خود شوید"};
    return result
};
export function createUploadPath(): string{
    let date : Date = new Date();
    const day : string = ""+date.getDate();
    const month : string = ""+date.getMonth();
    const year : string = ""+date.getFullYear();
    const uploadPath : string = path.join(__dirname,".." , ".." , "public" , "upload" , year , month , day);
    fs.mkdirSync(uploadPath , {recursive : true});
    return path.join("public" , "upload" , year , month , day)
    
};
export function createLinkforFile(fileAddres : string , req : Request) : string {
    return req.protocol+ "://" + req.get("host") + "/" + fileAddres.replace(/[\\\\]/gm , "/");
};
export  async function finderUserInTeam(teamID : Types.ObjectId , userID : Types.ObjectId ):Promise<boolean> {
    const result  = await TeamModel.findOne({
        $or : [{user : userID},{owner : userID}],
        _id : teamID
    });
    
    console.log(!!result + "!");
    
    
    return !!result;
    
    
};
