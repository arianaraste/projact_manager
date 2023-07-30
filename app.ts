import { ApplicationClass } from "./app/server";
import { General } from "./app/types/enum";

new ApplicationClass(General.PORT , General.DB_URL)