import { param } from "express-validator";

export const followValidator = [
    param('id')
        .isMongoId()
        .withMessage("Id invalido")
];