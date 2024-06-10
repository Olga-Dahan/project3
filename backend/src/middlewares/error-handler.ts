import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import logger from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // console.log(err.message);

    logger.error(err.message);

    let message;
    if (process.env.NODE_ENV === 'production') {
        message = 'something went wrong...';
    } else {
        message = err.message
    }

    // res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send(err.message || ReasonPhrases.INTERNAL_SERVER_ERROR)
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send(message || ReasonPhrases.INTERNAL_SERVER_ERROR)

}