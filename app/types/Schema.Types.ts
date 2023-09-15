import mongoose, { DefaultType, Document, ObjectId } from "mongoose";
import { Status } from "./General.type";
export interface InviteRequest extends Document {
    teamID : ObjectId , 
    caller : string,
    requestDate : Date,
    status : Status,
}
export interface IUser extends Document {
    firstname : string ,
    lastname : string ,
    username  : string,
    mobile : string ,
    roles : string[],
    email : string ,
    password : string ,
    skills : string[] ,
    teams : string[],
    token : string,
    profile_image : string,
    inviteRequests : InviteRequest[]
};
export interface ITeam extends Document {
    name : string,
    username : string ,
    description : string ,
    memmber : ObjectId,
    owner : ObjectId
};
export interface IProjact extends Document {
    title : string ,
    text : string ,
    img : string ,
    owner : ObjectId ,
    team : ObjectId ,
    private : boolean,
    tags : string[]
};
        
