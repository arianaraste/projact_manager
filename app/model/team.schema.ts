import mongoose, { model } from "mongoose";
import { ITeam, IUser } from "../types/Schema.Types";

const TeamSchema = new  mongoose.Schema<ITeam>({

    name : {type : String , required : true} ,
    username : {type : String , required : true , unique : true},
    description : {type : String} ,
    memmber : {type : [mongoose.Types.ObjectId], default : []},
    owner : {type : mongoose.Types.ObjectId , required : true}

} ,{
    timestamps : true
});

export const TeamModel = model<IUser>("Team" , TeamSchema)