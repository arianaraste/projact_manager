import { Router } from "express";
import {router as UserRouter} from "./user.routes";
import {router as TeamRouter} from "./team.routes";
import {router as ProjactRouter}from "./projact.routes";
import {router as AuthRouter} from "./auth.routes"

export const router : Router = Router();

router.use("/auth" , AuthRouter);
router.use("/user" , UserRouter);
router.use("/projact" , ProjactRouter);
router.use("/team" , TeamRouter);