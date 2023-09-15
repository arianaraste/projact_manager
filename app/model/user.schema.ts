import mongoose, { model } from "mongoose";
import { IUser, InviteRequest } from "../types/Schema.Types";
const InviteRequest = new mongoose.Schema<InviteRequest>({
    teamID : {type  : mongoose.Types.ObjectId , required  : true},
    caller : {type  : String , required  : true , lowercase  : true},
    requestDate : {type  : Date , default : new Date()},
    status : {type  : String , default  : "pending"},

})

const UserSchema = new  mongoose.Schema<IUser>({
    firstname : {type : String},
    lastname : {type : String},
    username : {type : String , required : true , unique : true , lowercase  : true},
    mobile : {type : String, required : true , unique : true},
    roles : {type : [String] , default : ["User"]},
    email : {type : String , required : true , unique : true , lowercase  : true } ,
    password : {type : String , required : true},
    skills : {type : [String] , default : []},
    teams : {type : [mongoose.Types.ObjectId] , default : []} ,
    token : {type : String , default : ""},
    profile_image : {type : String},
    inviteRequests : {type : [InviteRequest]}

} ,{
    timestamps : true
});

export const UserModel = model<IUser>("User" , UserSchema)