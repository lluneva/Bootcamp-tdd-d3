import jwt from 'jsonwebtoken'; //
import AppError from '../errors/AppError'; //custom errors that we created
import * as UserModel from '../models/UserModel';// * imports all of the properties as object exported in Users Model
import defaultErrorHandler from '../middlewares/defaultErrorHandler';

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

  const { username, email, hashedPassword } = req.body; // req.body.username, req.body.email, req.body.password
  try {
    await UserModel.save({
      username: req.body.username,
      email: req.body.email,
      rehashedPassword: req.body.hashedPassword
    })
    res.status(200).send({ payload: { message: 'Successfully registered' } })
    //paylod: a common practice name for important data to be sent/received
  } catch (error) {//this error comes from mongoose. 
    //And It should be built in that error jhas status and msg.
    next(new AppError(error.message, error.status));
  }
};



/**
 * Controller function used for signing users in.
 * 1. Using UserModel find that user already exists by his email from req.body.email
 * 2. If not, proceed with 'Wrong user credentials!', and status 400 error
 * 3. If there is, compare password from req.body and previously received UserModel from DB (UserModel.comparePassword)
 * 4. If passwords are not equal, proceed with 'Wrong password' and status 400
 * 5. If passwords are equal, sign jwt token and send it back to the client { payload: { message: 'Successfully loged in', token } }
 * P.S. JWT token must expires in 6 hours, token payload format should be { data: { username: user.username } }
 *
 * DOCS: https://www.npmjs.com/package/jsonwebtoken
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */

const logIn = async (req, res, next) => {
  logger.log('debug', 'logIn: %j', req.body);//logs information  when shall be debugging. Anything after% wil be replaced by req.body

  try {
    const user = await UserModel.getUserByEmail(req.body.email);
    if (!user) {
      throw new AppError('Wrong user credentials!', 400);
    }
    const isPasswordCorrect = await UserModel.comparePassword({
      userPassword: req.body.hashedPassword,
      rehashedPassword: user.rehashedPassword
    });

    if (!isPasswordCorrect) {
      throw new AppError('Wrong password', 400)
    }
    const token = jwt.sign(
      {
      data: { username: user.username },
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '6h' },
    );
    logger.log('info', `User: ${user.username} sucessfully logged in`);
    res.status(200).send({ payload: { message: 'Successfully loged in', token } })

  } catch (error) {
    next(error instanceof AppError ? error : new AppError(error.message, error.status))
  }

};

export { register, logIn };
