import { createStore } from "redux";
import Vacation_admin from "../models/Vacation_admin";

// 1. Global state for vacations
export class VacationsState {
    public vacations: Vacation_admin[] = [];
}

// 2. Action Type
export enum VacationsActionType { // what types of actions do we want to enable on the data itself
    SetVacations = 'SetVacations',
    DeleteVacation = 'DeleteVacation',
    UpdateVacation = 'UpdateVacation',
    AddVacation = 'AddVacation',
}

// 3. Action Object
export type VacationPayload = Vacation_admin[] | Vacation_admin | number;
export interface VacationsAction {
    type: VacationsActionType,
    payload: VacationPayload // בעברית: מטען this is the specific data that is delivered with the action
}

// 4. Reducer ()
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState }; // this is called cloning - שיכפול

    // .....
    switch (action.type) {
        case VacationsActionType.SetVacations: // payload here will be an array of vacations: Vacation[]
            newState.vacations = action.payload as Vacation_admin[];
            break;
        case VacationsActionType.AddVacation: // payload here will be a single vacation: Vacation
            const singleVacation = action.payload as Vacation_admin;
            newState.vacations.push(singleVacation);
            break;
        case VacationsActionType.DeleteVacation: // payload here will be vacation id: number
            const vacationId = action.payload as number;
            const indexToDelete = newState.vacations.findIndex(vacation => vacation.id === vacationId);
            if (indexToDelete !== -1) newState.vacations.splice(indexToDelete, 1);
            break;
        case VacationsActionType.UpdateVacation: // payload here will be a single vacation: Vacation
            const vacationToUpdate = action.payload as Vacation_admin;
            const indexToUpdate = newState.vacations.findIndex(vacation => vacation.id === vacationToUpdate.id);
            if (indexToUpdate !== -1) newState.vacations[indexToUpdate] = vacationToUpdate;
            break;

    }

    return newState;
}

// 5. store
export const vacationsStore = createStore(vacationsReducer);
