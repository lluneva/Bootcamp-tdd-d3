import express from 'express';
import bodyParser from 'body-parser'; 
// library that parses to a more readable jason obj.that we can use later in code
import cors from 'cors';// allows to make requests accross various domains
import './utils/dotenv'; // library ab environmental library

const logger = require('./utils/logger')('server');

const app = express();
// these 3 lines ususally should be in code; 
//difficult to understand why
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO Task.3
/**
 * To make index router and default handler we should attach them to app object as a two different middlewares:
 * 1. PATH for index should be `/api/v${process.env.API_VERSION}`
 */
const indexRouter = require ('./routes/index');
const petsRouter = require ('./routes/pets');

const defaultErrorHandler = require('./middlewares/defaultErrorHandler')
app.use(`/api/v${process.env.API_VERSION}/pets`,petsRouter);



app.use(`/api/v${process.env.API_VERSION}`, indexRouter);
app.use(defaultErrorHandler);


const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;


app.listen(port, host, () => {
  logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});
