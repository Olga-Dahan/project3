import axios from "axios";
import Vacation_admin from "../models/Vacation_admin";
import Vacations_followers from "../models/VacationsFollowers";
import appConfig from "../utils/AppConfig";
import { VacationsAction, VacationsActionType, vacationsStore } from "../redux/VacationsState";


class Vacations {


    public async getAll(): Promise<Vacation_admin[]> {

        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {
            const response = await axios.get<Vacation_admin[]>(appConfig.vacationsAdminUrl);

            vacations = response.data;

            const action: VacationsAction = {
                type: VacationsActionType.SetVacations,
                payload: vacations
            }

            vacationsStore.dispatch(action);
        }
        
        return vacations
    }

    public async getOne(id: number): Promise<Vacation_admin | undefined> {
        
        let vacations = vacationsStore.getState().vacations;

        let vacation = vacations.find(v => v.id === id)

        if (!vacation) {

            await this.getAll();
            
            vacations = vacationsStore.getState().vacations;

            vacation = vacations.find(v => v.id === id)

        }
        return vacation;

    }

    public async addVacation(vacation: Vacation_admin): Promise<Vacation_admin> {
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const response = await axios.post<Vacation_admin>(appConfig.vacationsAdminUrl + `/add`, vacation, config);

        const addedVacation = response.data;

        const action: VacationsAction = {
            type: VacationsActionType.AddVacation,
            payload: addedVacation
        }

        vacationsStore.dispatch(action);

        return addedVacation;

    }

    public async deleteVacation(id: number): Promise<void> {

        await axios.delete<void>(appConfig.vacationsAdminUrl + `/${id}`);

        const action: VacationsAction = {
            type: VacationsActionType.DeleteVacation,
            payload: id
        }

        vacationsStore.dispatch(action);

    }

    public async editVacation(vacation: Vacation_admin): Promise<Vacation_admin> {

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const response = await axios.patch<Vacation_admin>(appConfig.vacationsAdminUrl + `/${vacation.id}`, vacation, config);

        const updatedVacation = response.data;

        // const responseAllVacations = await axios.get<Vacation_admin[]>(appConfig.vacationsAdminUrl);

        // const vacations = responseAllVacations.data;

        const action: VacationsAction = {
            type: VacationsActionType.UpdateVacation,
            payload: updatedVacation
        }

        vacationsStore.dispatch(action);

        return updatedVacation;

    }



    public async sendCSV() : Promise<any>{
        const response = await axios.get<void>(appConfig.vacationsAdminUrl + `/csv`);
        const csv = response.data;
        return csv;
    }


    public async getVacationsFollowers(): Promise<Vacations_followers[]> {

        const response = await axios.get<Vacations_followers[]>(appConfig.vacationsAdminUrl + `/table`);

        const vacations = response.data;

        return vacations;
    }

}

// singleton
const vacations = new Vacations();
export default vacations;