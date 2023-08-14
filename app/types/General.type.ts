import { IProjact } from "./Schema.Types";

export type ERR_Type = {
    err_type : string ,
    status : number ,
    message : string ,
    data? : string
};


export type UpdateProject = {
    title : IProjact["title"],
    text : IProjact["text"],
    tags : IProjact["tags"]
}