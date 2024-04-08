import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import DTO from "./dto";
import DTO_CSV from "./dtoCSV";

import Model from "./model";

class Vacation implements Model {

    public async getAll_WithoutLimit(): Promise<DTO[]> {
        const vacations = await query(`
        SELECT	id, 
                destination, 
                description,
                startDate,
                endDate,
                price,
                imageName
        FROM	vacations
        ORDER BY startDate
        `)
        return vacations;
    }

    public async getVacationsFollowers(): Promise<DTO_CSV[]> {
        const vacations = await query(`
            SELECT	v.destination, 
                    count(f.userId) as followers
            FROM	vacations AS v
            LEFT JOIN    followers AS f ON f.vacationId = v.id 
            GROUP BY v.id
        `)
        return vacations;
    }

    public async getAll(): Promise<DTO[]> {
        const vacations = await query(`
            SELECT	id, 
                    destination, 
                    description,
                    startDate,
                    endDate,
                    price,
                    imageName
            FROM	vacations 
            ORDER BY startDate
        `)

        return vacations;
    }

    public async getOne(id: number): Promise<DTO> {
        const vacations = await query(`
            SELECT	id, 
                    destination, 
                    description,
                    startDate,
                    endDate,
                    price,
                    imageName
            FROM	vacations 
            WHERE id =?
        `, [id]);
        return vacations[0];
    }

    public async add(vacation: DTO): Promise<DTO> {
        let { destination, description, startDate, endDate, price, imageName } = vacation;
        if (imageName === undefined) imageName = "";
        const result: OkPacketParams = await query(`
            INSERT INTO vacations(destination, description, startDate, endDate, price, imageName) 
            VALUES(?,?,?,?,?,?) 
        `, [destination, description, startDate, endDate, price, imageName]);
        return this.getOne(result.insertId);
    }

    public async update(vacation: DTO): Promise<DTO> {
        let { id, destination, description, startDate, endDate, price, imageName } = vacation;
        if (imageName === undefined) imageName = "";
        await query(`
            UPDATE  vacations
            SET     destination = ?, 
                    description = ?,
                    startDate = ?,
                    endDate = ?,
                    price = ?,
                    imageName = ?
            WHERE   id = ?
        `, [destination, description, startDate , endDate , price, imageName, id]);
        return this.getOne(id);
    }

    public async delete(id: number): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM vacations
            WHERE       id = ?
        `, [id]);
        return Boolean(result.affectedRows);
    }

}

const vacation = new Vacation();
export default vacation;