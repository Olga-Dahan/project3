process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';

import express, { application } from "express";
import authRouter from './routers/auth';
import vacationsAdminRouter from './routers/vacations_admin';
import vacationsRouter from './routers/vacations';
import config from 'config';
import { notFound } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/error-handler";
import { errorLogger } from "./middlewares/error-logger";
import { pagerDuty } from "./middlewares/pager-duty";
import userLogger from "./middlewares/user-logger";
import authentication from "./middlewares/authentication";
import enforceAuth from "./middlewares/enforce-auth";
import expressFileUpload from 'express-fileupload';
import path from 'path';
import cors from 'cors';
import stripTags from "./middlewares/strip-tags";
import { limiter } from "./middlewares/limiter";


const server = express();
server.use(limiter);
server.use(cors());
// server.use(cors({origin: ['http://localhost:3000', 'http://localhost:3001']}));
server.use(authentication);
server.use(userLogger);
server.use(express.json());
server.use(stripTags);
server.use(expressFileUpload())

server.use('/api', authRouter)
server.use(stripTags);
server.use('/api/vacations', vacationsRouter)
server.use('/api/vacations-admin', vacationsAdminRouter)

server.use('/images', express.static(path.resolve(config.get<string>('app.images.path'))))

// special middleware for not found error
server.use(notFound)

// error middlewares
server.use(errorLogger)
server.use(pagerDuty)
server.use(errorHandler)

export default server;
