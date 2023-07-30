import { type } from "os";

export type ERR_Type = {
    err_type : string ,
    status : number ,
    message : string ,
    data? : string
};
export type checkError = object[]