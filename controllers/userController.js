import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

const getUserInfo = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.body);
  const username = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.log('debug', 'Login failed, token invalid');
      throw new AppError('Wrong user credentials!', 400);
    }
    return decoded.data.username;
  });
  const user = await UserModel.getUserByName(username);
  res.status(200).send({
    payload: {
      id: user['_id'],
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  });
};

export { getUserInfo };
