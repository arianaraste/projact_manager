import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { checkError } from "../../types/General.type";

export default function ExpressValidationResult (req : Request , res : Response , next : NextFunction): Response | undefined{
    let messages : Array<string> = [];
    const result : Result<ValidationError> = validationResult(req);
    if(result.array().length > 0){
        result.array().forEach(err => {
            messages.push(err?.msg)    
        });
        console.log(messages);
        
        if (messages[0] != "Invalid value") {
            return res.status(400).json({
                status : 400 ,
                state : "ناموفق",
                messages,
            })
        }
    }
    next()       
}
