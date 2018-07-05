import jwt from 'jsonwebtoken';
import { getUserByName } from '../models/UserModel';
import { getCommentsByPost, save } from '../models/CommentModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logController');

const getPostComments = async (req, res) => {
  logger.log('debug', 'getPostComments: %j', req.body);
  const comments = await getCommentsByPost(req.params.mediaId);
  res.status(200).send({ payload: { comments } });
};

const addPostComments = async (req, res) => {
  logger.log('debug', 'addPostComments: %j', req.body);

  const username = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.log('debug', 'Login failed, token invalid');
      throw new AppError('Wrong user credentials!', 400);
    }
    return decoded.data.username;
  });

  const user = await getUserByName(username);
  await save({
    message: req.body.text,
    username: user.username,
    mediaId: req.params.mediaId,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  res.status(201).send();
};

export { getPostComments, addPostComments };
