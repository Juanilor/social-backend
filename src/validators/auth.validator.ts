import { body } from "express-validator";

export const regiterValidator = [
    body("username").notEmpty().withMessage("Nombre de usuario requerido."),
    body("email").isEmail().withMessage("Email invalido."),
    body("password").isLength({min: 6}).withMessage("Minimo 6 caracteres."),
];

export const loginValidator = [
    body("email").isEmail().withMessage("Email invalido."),
    body("password").isLength({min: 6}).withMessage("Minimo 6 caracteres."),
];

