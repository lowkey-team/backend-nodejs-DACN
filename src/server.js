import express from 'express';
import exitHook from 'async-exit-hook';
import { env } from '~/config/environment';
import { APIs_V1 } from '~/routes/v1';
import { errorHandlingMiddleware } from '~/middlewares/ErrorHandlingMiddleware';
import cors from 'cors';
import { corsOptions } from './config/cors';

import {
  GET_DB,
  CLOSE_DB,
  CONNECT_DB
} from '~/config/mysql';

const app = express();
const hostname = env.APP_HOST;
const port = env.APP_PORT;

const START_SERVER = () => {
  app.use(cors(corsOptions));
  app.use(express.json()); 
  app.use('/v1', APIs_V1);
  app.use(errorHandlingMiddleware);

  app.listen(port, hostname, () => {
    console.log(`Hello Vuong, I am running at http://${hostname}:${port}/`);
  });

  exitHook(() => {
    CLOSE_DB();
  });
}

CONNECT_DB()
  .then(() => {
    console.log('Connected to database mysql');
    START_SERVER(); 
  })
  .catch(error => {
    console.error('Error connecting to mysql:', error);
    process.exit(0);
  });
