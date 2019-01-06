import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/dotenv';

const logger = require('./utils/logger')('server');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO Task.3
/**
 * To make index router and default handler we should attach them to app object as a two different middlewares:
 * 1. PATH for index should be `/api/v${process.env.API_VERSION}`
 */
app.use();
app.use();

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;

app.listen(port, host, () => {
  logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});
