import mongoose, { model } from "mongoose";
import { IProjact } from "../types/Schema.Types";

const ProjactSchema = new mongoose.Schema<IProjact>({
    title : {type : String} ,
    text : {type : String} ,
    img : {type : String , default : "/defult/defult.png"} ,
    owner : {type : mongoose.Types.ObjectId , required : true} ,
    team : {type : mongoose.Types.ObjectId} ,
    private : {type : Boolean , default : true},
    tags : {type : [String] , default : []}
});

export const ProjactModel = model<IProjact>("Projact" , ProjactSchema);