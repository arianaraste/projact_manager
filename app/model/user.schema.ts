import mongoose, { model } from "mongoose";
import { IUser } from "../types/Schema.Types";

const UserSchema = new  mongoose.Schema<IUser>({
    firstname : {type : String},
    lastname : {type : String},
    username : {type : String , required : true , unique : true},
    mobile : {type : String, required : true , unique : true},
    roles : {type : [String] , default : ["User"]},
    email : {type : String , required : true , unique : true } ,
    password : {type : String , required : true},
    skills : {type : [String] , default : []},
    teams : {type : [mongoose.Types.ObjectId] , default : []} ,
    token : {type : String , default : ""}

} ,{
    timestamps : true
});

export const UserModel = model<IUser>("User" , UserSchema)