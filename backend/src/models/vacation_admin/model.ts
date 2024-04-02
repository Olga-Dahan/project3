import DTO from "./dto";
import DTO_CSV from "./dtoCSV";

export default interface Model {
    getVacationsFollowers(): Promise<DTO_CSV[]>;
    getAll(offset: number): Promise<DTO[]>;
    getOne(id: number): Promise<DTO>;
    add(vacation: DTO): Promise<DTO>;
    update(vacation: DTO): Promise<DTO>;
    delete(id: number): Promise<boolean>;
}