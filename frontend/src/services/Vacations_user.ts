import axios from "axios";
import appConfig from "../utils/AppConfig";
import Vacation from "../models/Vacation";

class Vacations {

    public async getAll(userId: string, isFollowing: boolean, didntStart: boolean, onGoing: boolean): Promise<Vacation[]> {

        const response = await axios.get<Vacation[]>(appConfig.vacationsUrl + `/${userId}` + `?` + `isFollowing=` + `${isFollowing}` + `&` + `didntStart=` + `${didntStart}` + `&` + `onGoing=` + `${onGoing}`);
        const filteredVacations = response.data;
        return filteredVacations;
    }


    public async followUnfollow(userId: string, vacationId: number): Promise<void> {

        await axios.get<void>(appConfig.vacationsUrl + `/${userId}` + `/${vacationId}`);

    }

}

const vacations = new Vacations();
export default vacations;

