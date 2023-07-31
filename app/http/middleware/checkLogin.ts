import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../modules/function";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../types/Schema.Types";
import { UserModel } from "../../model/user.schema";

export const checkLogin = async(req : Request , res : Response , next : NextFunction)=>{
    try {
        let err : object = {status : 401 , message : "لطفا وارد حساب کاربری خود شوید"};
        const authorization : string | undefined = req?.headers?.authorization ;
        if(!authorization)throw err ;
        const token : string = authorization.split(" ")?.[1];
        if(!token) throw err ;
        const result : string | JwtPayload = verifyToken(token);        
        const user : IUser | null = await UserModel.findOne( {username : result} , {password : 0});
        if(!user)throw err;
        req.user = user
        return next()
        
    } catch (error) {
        next(error)
    }
}