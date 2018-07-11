import * as MediaModel from '../models/MediaModel';
import * as PostModel from '../models/PostModel';
import getUserByToken from '../utils/getUserFromToken';
import { UPLOAD_FOLDER } from '../consts/web_consts';

const logger = require('../utils/logger')('logController');

const getPosts = async (req, res) => {
  logger.log('debug', 'getPosts: %j', req.body);
  const posts = await PostModel.getRandomPosts();
  res.status(200).send({ payload: !posts ? [] : posts });
};

const addPosts = async (req, res) => {
  logger.log('debug', 'addPosts: %j', req.body);
  const user = await getUserByToken(req);
  const post = PostModel.save({
    title: req.body.caption,
    username: user.username,
    media: req.body.contentId,
  });
  console.log(req.body);
  res.status(200).send({ payload: post });
};

const attachMedia = async (req, res) => {
  logger.log('debug', 'attachMedia: %j', req.body);
  const user = await getUserByToken(req);
  const {
    file: { filename },
  } = req;

  const media = await MediaModel.save({
    username: user.username,
    url: filename,
  });
  res.status(200).send({
    payload: {
      conetntId: media._id,
      url: `/${UPLOAD_FOLDER}/${'file.filename'}`,
    },
  });
};

const getPostById = async (req, res) => {
  logger.log('debug', 'getPostById: %j', req.body);
  console.log(req.params.mediaId);
  const post = await PostModel.getPostById(req.params.mediaId);
  res.status(200).send({ payload: post });
};

export { getPosts, addPosts, attachMedia, getPostById };
