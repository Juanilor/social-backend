import { Response } from "express";

export const successResponse = (res: Response, data: any, message = "Operacion exitosa.", statusCode = 200) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });


};


export const errorResponse = (
    res: Response,
    message = "Error interno de servidor.",
    statusCode = 500
) => {

    return res.status(statusCode).json({
        success: false,
        message
    });


};