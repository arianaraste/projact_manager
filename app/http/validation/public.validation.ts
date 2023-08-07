import { param } from "express-validator";

export const idValidation = ()=>[
    param("id").isMongoId().withMessage("ایدی وارد شده صحیح نمی باشد")
];