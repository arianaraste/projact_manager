import { DefaultType, ObjectId } from "mongoose";

export interface IUser extends Document {
    firstname : string ,
    lastname : string ,
    username  : string,
    mobile : string ,
    roles : DefaultType<Array<string>>,
    email : string ,
    password : string ,
    skills : DefaultType<Array<string>> ,
    teams : DefaultType<Array<string>>,
};
export interface ITeam extends Document {
    name : string,
    description : string ,
    user : ObjectId ,
    owner : ObjectId
};
export interface IProjact extends Document {
    title : string ,
    text : string ,
    img : string ,
    owner : ObjectId ,
    team : ObjectId ,
    private : boolean
};
        
