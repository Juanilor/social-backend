import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { errorResponse } from "../helpers/response.helper";

export const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {

    let statusCode = 500;

    if( err instanceof AppError) {
        statusCode = err.statusCode;
    }

    return errorResponse(
        res,
        err.message || "Error interno de servidor",
        statusCode
    )
};