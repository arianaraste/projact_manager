import { genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Token } from "typescript";
import { General } from "../types/enum";

export function hashString(str : string) : string {
    const salt : string = genSaltSync(10);
    return hashSync(str , salt);
};

export function tokenGenreator(payload : string): string{
    const token : string | undefined = sign(payload , General.SECRET_KEY) ;
    return token
}
