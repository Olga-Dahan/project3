import DTO from "./dto";
import DTO_PARAMS from "./dto_params";
import DTO_VACATION_FOLLOW from "./dto_vacation_follow";


export default interface Model {
    getAll(id: string, query_params: DTO_PARAMS): Promise<DTO[]>;
    checkIfFollow(userId: string, vacationId: number): Promise<DTO_VACATION_FOLLOW[]>;
    follow (userId: string, vacationId: number): Promise<DTO_VACATION_FOLLOW[]>;
    unfollow(userId: string, vacationId: number): Promise<boolean>
}