import { genSaltSync, hashSync } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Token } from "typescript";
import { General } from "../types/enum";
import { IUser } from "../types/Schema.Types";

export function hashString(str : string) : string {
    const salt : string = genSaltSync(10);
    return hashSync(str , salt);
};

export function tokenGenreator(payload : string): string{
    const token : string = sign(payload , General.SECRET_KEY);
    return token
};
export function verifyToken(token : string):  JwtPayload | string {
    const result : JwtPayload | string = verify(token , General.SECRET_KEY);
    if(!result)throw {status : 401 , message : "لطفا وارد حساب کاربری خود شوید"};
    return result
}
