import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import { getUserByName, UserModel } from '../models/UserModel';
import { resolve } from 'dns';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('authenticate');
// TODO Task.3

/**
 * jwtVerify should verify passed token and return true or false.
 *
 * DOCS: https://www.npmjs.com/package/jsonwebtoken
 * @param {*} token to be verified
 */
const jwtVerify = token => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
};
//     return new Promise(resolve, () => {
//         jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
//             resolve(decodedToken);
//         });
//     });
// };

/**
 * This is middleware, which should extract bearer token from authorization header.
 * 1. Extract token from req.headers
 * 2. If it not exists, pass No token provided AuthError to the next()
 * 3. If it exists, verify it using jwtVerify function and extract decodedToken
 * 4. Retrieve user by its name using getUserByName and attach to req.user, so it will be a accessible in further middlewares
 * 5. Pass flow using next();
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const authenticate = async (req, res, next) => {

    try {
        const { authorization } = req.headers; // i know there is a prop in obj names authorization, so i name
        // the new const like that and assign the same value. 
        //It equals const authorization =req.headers.authorization
        if (!authorization) {
            throw new AuthError('No token provided')
        }
       
            [, token] = authorization.split(' ')// el w index 1 is named token and will have value of 
        //result of authorization.split(''); namely let token = authorization.split(' ')[1]
        if (!jwtVerify(token)) {
            throw new AuthError('Invalid token');
        } else {
            const decodedToken = jwt.decode(token); //decoding token
            const user = await getUserByName(decodedToken.data.username);
            req.user = user;
            next();
        }
    } catch (error) {
        next(error)
    }
}



export default authenticate;
