import jwt from 'jsonwebtoken';
import * as UserModel from '../models/UserModel';

const getUserByToken = async req => {
  const { authorization } = req.headers;
  let token;
  if (authorization) {
    [, token] = authorization.split(' ');
  }
  const username = jwt.verify(token, process.env.JWT_SECRET);
  return UserModel.getUserByName(username);
};

export default getUserByToken;
