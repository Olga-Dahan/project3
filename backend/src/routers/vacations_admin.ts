import express, { Router } from "express";
import { getAll, add, update, patch, remove, sendCSV, getVacationsFollowers } from "../controllers/vacations_admin/controller";
import validate from "../middlewares/input-validation";
import { addVacationValidator, updateVacationValidator, patchVacationValidator } from '../controllers/vacations_admin/validator';
import addImageToBody from "../middlewares/add-image-to-body";
import uploadImage from "../middlewares/upload-image";
import enforceAdmin from '../middlewares/enforce-admin';


const router = Router();
router.use(enforceAdmin)

router.get('/', getAll)
router.post('/add', addImageToBody, validate(addVacationValidator) ,uploadImage ,add)
router.put('/:id([0-9]+)', addImageToBody, validate(updateVacationValidator), uploadImage ,update)
router.patch('/:id([0-9]+)', addImageToBody, validate(patchVacationValidator), uploadImage, patch)
router.delete('/:id([0-9]+)', remove)
router.get('/csv', sendCSV)
router.get('/table', getVacationsFollowers)



export default router;