import {body} from 'express-validator';

export const createPostValidator = [

    body("content").notEmpty().withMessage("Contenido requerido.").isLength({max: 200}).withMessage("Maximo 200 caracteres."),
];

export const commentPostValidator = [
    body("content").notEmpty().withMessage("Contenido requerido.").isLength({max: 200}).withMessage("Maximo 200 caracteres."),
]
