import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

// TODO Task.2

/**
 * Controller function used for registering user. Previously created user model should be used here
 * to save input coming from the client in form of http POST request.
 * 1. Extract user data from req.body
 * 2. Use UserModel to save user
 * 3. Send back result with status 200 and { payload: { message: 'Successfully registered' } }
 * 4. if error occurred, catch it, wrap it into AppError passing message and status and pass to defaultErrorHandler using next()
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const register = async (req, res, next) => {
  logger.log('debug', 'register: %j', req.body);
};

/**
 * Controller function used for signing users in.
 * 1. Using UserModel find that user already exists by his email from req.body.email
 * 2. If not, proceed with 'Wrong user credentials!', and status 400 error
 * 3. If there is, compare password from req.body and previously received UserModel from DB (UserModel.comparePassword)
 * 4. If passwords are not equal, proceed with 'Wrong password' and status 400
 * 4. If passwords are equal, sign jwt token and send it back to the client { payload: { message: 'Successfully loged in', token } }
 * P.S. JWT token must expires in 6 hours, token payload format should be { data: { username: user.username } }
 *
 * DOCS: https://www.npmjs.com/package/jsonwebtoken
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const logIn = async (req, res, next) => {
  logger.log('debug', 'logIn: %j', req.body);
};

export { register, logIn };
