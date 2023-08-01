import { Interface } from "readline"
import { IUser } from "./Schema.Types";

export type RegisterUser = {
    username : string ,
    password : string ,
    mobile : number ,
    email : string
};

export type EditProfile = {
    firstname : string ;
    lastname : string ;
    skills : string ;
}
export type Updateprofile = {
    firstname : string ;
    lastname : string ;
    skills : string[] ;
}