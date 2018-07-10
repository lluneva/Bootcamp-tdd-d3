import jwt from 'jsonwebtoken';
import * as UserModel from '../models/UserModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logUtils');

const getUserByToken = async req => {
  const username = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.log('debug', 'Login failed, token invalid');
      throw new AppError('Wrong user credentials!', 400);
    }
    return decoded.data.username;
  });
  return UserModel.getUserByName(username);
};

export default getUserByToken;
