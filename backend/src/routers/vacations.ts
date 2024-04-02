import { NextFunction, Request, Response, Router } from "express";
import { getAll, followUnfollow} from "../controllers/vacations/controller";
import enforceAuth from '../middlewares/enforce-auth';

const router = Router();
router.use(enforceAuth)

router.get('/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', getAll)
router.get('/:userId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/:vacationId([0-9]+)', followUnfollow)



export default router;