import { NextFunction, Request, Response } from "express";
import getModel from "../../models/vacation/factory"
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import createHttpError, { NotFound } from "http-errors";
import config from 'config';
import DTO from "../../models/vacation/dto";

function convertVacationToImageUrl(vacation: DTO) {
    const vacationWithImageUrl = {
        ...vacation,
        price: Number(vacation.price),
        imageUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.imageName}`
    }
    delete vacationWithImageUrl.imageName;
    return vacationWithImageUrl;
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const isFollowing: boolean = ("true" === req.query.isFollowing);
        const didntStart: boolean = ("true" === req.query.didntStart);
        const onGoing: boolean = ("true" === req.query.onGoing);

        const vacations = await getModel().getAll(id, {
            isFollowing,
            didntStart,
            onGoing
        });
        res.json(vacations.map(convertVacationToImageUrl));
    } catch (err) {
        next(err);
    }

}


export const followUnfollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const vacationId = +req.params.vacationId;
        const checkIfFollow = await getModel().checkIfFollow(userId, vacationId);
        
        if (checkIfFollow.length === 0) {
            const result = await getModel().follow(userId, vacationId);
            res.status(StatusCodes.CREATED).json(result[0]);
        }
        else {
            const isUnfollowed = await getModel().unfollow(userId, vacationId);
            if (!isUnfollowed) return next(createHttpError(NotFound(`tried to unfollow vacation with id ${vacationId}`)));
            res.sendStatus(StatusCodes.NO_CONTENT);
        }
    } catch (err) {
        next(err)
    }

}


