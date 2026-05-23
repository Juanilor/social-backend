import { param } from "express-validator";

export const mongoIdValidator = (paramName: string) => [
    param(paramName).isMongoId().withMessage(`${paramName} invalido`)
];