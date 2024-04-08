import { createHash, createHmac } from 'crypto';
import userDTO from '../models/auth/user-dto';
import { sign } from 'jsonwebtoken';


export function hashPassword(plainTextPassword: string, salt: string): string {
    return createHmac('md5', salt)
        .update(`${plainTextPassword}`) // <= salting the password
        .digest('hex'); // export has hexa
}

export function generateJWT(user: userDTO, secret: string, expiresIn: string): string {
    return sign({ user }, secret, { expiresIn })
}
