import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import DTO from "./dto";
import DTO_PARAMS from "./dto_params";
import DTO_VACATION_FOLLOW from "./dto_vacation_follow";

import Model from "./model";

class Vacation implements Model {

    public async getAll(id: string, query_params: DTO_PARAMS): Promise<DTO[]> {
        const sqlParams = [];

        let sql = `
            SELECT	v.id, 
                    v.destination, 
                    v.description,
                    v.startDate,
                    v.endDate,
                    v.price,
                    v.imageName,
                    (SELECT COUNT(*) FROM followers WHERE vacationId = v.id ) AS numberOfFollowers,
                    (SELECT count(*) from followers WHERE vacationId = v.id and userId = ?) as iAmFollowing
            FROM	vacations AS v
            LEFT JOIN    followers AS f ON f.vacationId = v.id 
            WHERE 1 = 1
        `
        sqlParams.push(id)

        if (query_params.isFollowing === true) {
            sql += 'AND f.userId = ?'
            sqlParams.push(id)
        }

        if (query_params.didntStart === true) {
            sql += 'AND v.startDate > NOW()'
        }

        if (query_params.onGoing === true) {
            sql += 'AND v.startDate < NOW() AND v.endDate > NOW()'
        }

        sql += `GROUP BY v.id
                ORDER BY v.startDate
        `
        const vacations = await query(sql, sqlParams);

        return vacations;
    }

    public async checkIfFollow(userId: string, vacationId: number): Promise<DTO_VACATION_FOLLOW[]> {
        const vacations = await query(`
            SELECT	userId, 
                    vacationId 
            FROM	followers 
            WHERE   userId = ? AND vacationId = ?
        `, [userId, vacationId]);

        return vacations;
    }

    public async follow(userId: string, vacationId: number): Promise<DTO_VACATION_FOLLOW[]> {
        await query(`
            INSERT INTO followers(userId, vacationId) 
            VALUES(?,?) 
        `, [userId, vacationId]);

        return this.checkIfFollow(userId, vacationId);
    }

    public async unfollow(userId: string, vacationId: number): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM followers
            WHERE       userId = ? AND vacationId = ?
        `, [userId, vacationId]);
        return Boolean(result.affectedRows);
    }
}

const vacation = new Vacation();
export default vacation;