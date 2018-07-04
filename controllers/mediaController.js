const logger = require('../utils/logger')('logController');

const getPosts = async (req, res) => {
  logger.log('debug', 'getPosts: %j', req.body);
  res.status(200).send({ message: 'Work in prgress' });
};

const addPosts = async (req, res) => {
  logger.log('debug', 'addPosts: %j', req.body);
  res.status(200).send({ message: 'Create new posts' });
};

const attachMedia = async (req, res) => {
  logger.log('debug', 'attachMedia: %j', req.body);
  res.status(200).send({ message: 'Work in prgress' });
};

const getPostById = async (req, res) => {
  logger.log('debug', 'getPostById: %j', req.body);
  res.status(200).send({ message: 'Work in prgress' });
};

const getPostComments = async (req, res) => {
  logger.log('debug', 'getPostComments: %j', req.body);
  res.status(200).send({ message: 'Work in prgress' });
};

const addPostComments = async (req, res) => {
  logger.log('debug', 'addPostComments: %j', req.body);
  res.status(200).send({ message: 'Work in prgress' });
};

export { getPosts, addPosts, attachMedia, getPostById, getPostComments, addPostComments };
