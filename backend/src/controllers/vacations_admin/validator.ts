import Joi from "joi"
import DTO from "../../models/vacation/dto"

export const addVacationValidator = Joi.object<DTO>({
    id: Joi.number().optional(),
    destination: Joi.string().min(4).required(),
    description: Joi.string().min(4).required(),
    startDate: Joi.date().greater("now").required(),
    endDate: Joi.date().greater("now").greater(Joi.ref('startDate')).required(),
    price: Joi.number().min(1).max(10000).required(),
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png'),
    }).unknown(true).optional()
});

export const updateVacationValidator = addVacationValidator;

export const patchVacationValidator = Joi.object<DTO>({
    id: Joi.number().optional(),
    destination: Joi.string().min(4),
    description: Joi.string().min(4),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    price: Joi.number().min(1).max(10000),
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png'),
    }).unknown(true).optional()
});