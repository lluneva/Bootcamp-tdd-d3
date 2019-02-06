import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/dotenv';
import authRouter from './routes/auth';
import user from './routes/user';
import index from './routes/index';
import authenticate from './middlewares/authenticate';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')('server');

const app = express();

// TODO Study.2
/**
 * Mongoose connect with express-session
 *
 * DOCS: https://www.npmjs.com/package/express-session; https://mongoosejs.com/docs/connections.html
 */
const MongoStore = mongo(session);
mongoose.Promise = global.Promise; // Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
);
mongoose.connection.on('error', error => {
  logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
mongoose.connection.once('open', () => logger.log('info', 'MongoDB has been connected.'));

app.use(cors());

app.use(bodyParser.json()); // the library called bodyParses parses the body instead of doing it "somehow manually". :-D
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    }),
  }),
);

// TODO Task.7
/**
 * 1. Attach authRouter and user router to app on /api/v${process.env.API_VERSION}/auth and /api/v${process.env.API_VERSION}/users paths
 * 2. UserRouter should be "protected" with authenticate middleware
 */
app.use(`/api/v${process.env.API_VERSION}`, index);

app.use(defaultErrorHandler);

const host = process.env[`HOST_${process.platform.toUpperCase()}`];
const port = process.env.PORT || process.env.HOST_PORT;

app.listen(port, host, () => {
  logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});
