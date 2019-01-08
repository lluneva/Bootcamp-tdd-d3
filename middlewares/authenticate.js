import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import { getUserByName } from '../models/UserModel';

const logger = require('../utils/logger')('authenticate');
// TODO Task.3

/**
 * jwtVerify should verify passed token and return true or false.
 *
 * DOCS: https://www.npmjs.com/package/jsonwebtoken
 * @param {*} token to be verified
 */
const jwtVerify = token => {};

/**
 * This is middleware, which should extract bearer token from authorization header.
 * 1. Extract token from req.headers
 * 2. If it not exists, pass No token provided AuthError to the next()
 * 3. If it exists, verify it using jwtVerify function and extract decodedToken
 * 4. Retrieve user by its name using UserName and attach to req.user, so it will be a accessible in further middlewares
 * 5. Pass flow suing next();
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const authenticate = async (req, res, next) => {};

export default authenticate;
