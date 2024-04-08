import { NextFunction, Request, Response } from "express";
import createHttpError, { BadRequest, InternalServerError } from "http-errors";
import Joi from "joi";

const validate = (validator: Joi.ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const validated = await validator.validateAsync(req.body, {
            abortEarly: false
        }) 
       
        req.body = validated;
        return next();
    } catch (err) {
        if (err.isJoi) { 
            if (err.message.includes(`"email" with value`)) return next(createHttpError(BadRequest('The email is invalid!')))
            if (err.message.includes("must be a valid email")) return next(createHttpError(BadRequest('The email is invalid!')))
            if (err.message.includes(`must be greater than "now"`)) return next(createHttpError(BadRequest(`You can't select past date!`)))
            if (err.message.includes("must be greater than")) return next(createHttpError(BadRequest('End date must be later than start date!')))
            return next(createHttpError(BadRequest(err.message)))
        }
        return next(createHttpError(InternalServerError(err)))
    }
}

export default validate;