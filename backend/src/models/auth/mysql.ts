import Model from "./model";
import CredentialsDTO from './credentials-dto';
import UserDTO, { Roles } from './user-dto';
import query from "../../db/mysql";
import config from "config";
import { hashPassword } from "../../utils/crypto";

class User implements Model {

    public async getOne(email: string): Promise<UserDTO> {
        const user = (await query(`
            SELECT  id,
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId
            FROM    users  
            WHERE   email = ?
        `, [email]))[0];
        return user;
    }

    public async login(credentials: CredentialsDTO): Promise<UserDTO> {
        const { email, password } = credentials;

        const user = (await query(`
            SELECT  id,
                    firstName,
                    lastName,
                    email,
                    password,
                    roleId
            FROM    users  
            WHERE   email = ?
            AND     password = ?
        `,[ email, hashPassword(password, config.get<string>('app.secret'))]))[0];
        return user;
    }

    public async signup(user: UserDTO): Promise<UserDTO> {
        const { firstName, lastName, email, password } = user;
        await query(`
            INSERT INTO users(firstName, lastName, email, password, roleId) 
            VALUES(?,?,?,?,?) 
        `, [firstName, lastName, email, hashPassword(password, config.get<string>('app.secret')), Roles.USER]);
        return this.getOne(email);
    }
}

const user = new User();
export default user;