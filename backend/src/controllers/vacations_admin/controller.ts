import { NextFunction, Request, Response } from "express";
import getModel from "../../models/vacation_admin/factory"
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import createHttpError, { NotFound } from "http-errors";
import config from 'config';
import { json2csv } from 'json-2-csv';
import DTO from "../../models/vacation_admin/dto";



function convertVacationToImageUrl(vacation: DTO) {
    const vacationWithImageUrl = {
        ...vacation,
        price: Number(vacation.price),
        imageUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.imageName}`
    }
    delete vacationWithImageUrl.imageName;
    return vacationWithImageUrl;
}


export const sendCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getVacationsFollowers();

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment;filename=vacations.csv')
        const csv = await json2csv(vacations, {});

        res.send(csv)
    } catch (err) {
        next(err)
    }
}

export const getVacationsFollowers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getVacationsFollowers();

        res.json(vacations);
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAll();
        res.json(vacations.map(convertVacationToImageUrl));
    } catch (err) {
        next(err);
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacation = await getModel().getOne(+req.params.id);
        if (!vacation) return next();
        res.json(convertVacationToImageUrl(vacation));
    } catch (err) {
        next(err)
    }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacation = await getModel().add(req.body);
        res.status(StatusCodes.CREATED).json(convertVacationToImageUrl(vacation));
    } catch (err) {
        next(err)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const updatedVacation = { id, ...req.body }
        const vacation = await getModel().update(updatedVacation);
        res.json(convertVacationToImageUrl(vacation));
    } catch (err) {
        next(err)
    }

}

export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const existingVacation = await getModel().getOne(id);
        const updatedVacation = { ...existingVacation, ...req.body };
        const vacation = await getModel().update(updatedVacation);

        res.json(convertVacationToImageUrl(vacation));
    } catch (err) {
        next(err)
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().delete(+req.params.id)
        if (!isDeleted) return next(createHttpError(NotFound(`tried to delete nonexisting vacation with id ${req.params.id}`)));
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (err) {
        next(err)
    }
}
