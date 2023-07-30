import { genSaltSync, hashSync } from "bcrypt";

export function hashString(str : string) : string {
    const salt : string = genSaltSync(10);
    return hashSync(str , salt);
};