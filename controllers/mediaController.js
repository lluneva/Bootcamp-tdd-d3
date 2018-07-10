import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';
import * as MediaModel from '../models/MediaModel';

const logger = require('../utils/logger')('logController');

const getPosts = async (req, res) => {
  logger.log('debug', 'getPosts: %j', req.body);
  res.status(200).send({ message: 'getPosts Work in prgress' });
};

const addPosts = async (req, res) => {
  logger.log('debug', 'addPosts: %j', req.body);
  res.status(200).send({ message: 'Create new posts' });
};

const attachMedia = async (req, res) => {
  logger.log('debug', 'attachMedia: %j', req.body);
  const username = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.log('debug', 'Login failed, token invalid');
      throw new AppError('Wrong user credentials!', 400);
    }
    return decoded.data.username;
  });
  const user = await UserModel.getUserByName(username);
  const { file } = req;

  const media = await MediaModel.save({
    username: user.username,
    url: file.filename,
  });
  res.status(200).send({ conetntId: media._id, url: `/uploads/image/${'file.filename'}` });
};

const getPostById = async (req, res) => {
  logger.log('debug', 'getPostById: %j', req.body);
  res.status(200).send({ message: 'getPostById Work in prgress' });
};

export { getPosts, addPosts, attachMedia, getPostById };
