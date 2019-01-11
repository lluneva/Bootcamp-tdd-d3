const logger = require('../utils/logger')('logController');
// TODO Task.3

/**
 * AttachMedia is used to save uploaded picture id and path to db, in parallel with post creation on afrontend.
 * It will be placed after diskStorage middleware, so picture will be already uploaded when request will reach it.
 *
 * 1. Extract filename from req (uploaded file metadata was previously attached by diskStorage middleware)
 * 2. Save new model using MediaModel
 * 3. Send status 200 and { payload: { contentId: media.id, path: `/${UPLOAD_FOLDER}/${filename}` } in case of success
 * 4. In case of error pass AppError(error.message) to next function
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const attachMedia = async (req, res, next) => {
  logger.log('debug', 'attachMedia: %j', req.body);
};

/**
 * Handler should add new post using contentId and caption passed from client in req.body
 *
 * 1. Retrieve media path by its id using MediaModel
 * 2. Create new post using PostModel
 * 3. Send status 200 and { payload: post } in case of success
 * 4. In case of error pass AppError(error.message) to next function
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const addPosts = async (req, res, next) => {
  logger.log('debug', 'addPosts: %j', req.body);
};

/**
 * 1. Retrieve random posts
 * 2. Send status 200 and { payload: posts || [] } in case of success
 * 3. In case of error pass AppError(error.message) to next function
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const getPosts = async (req, res, next) => {
  logger.log('debug', 'getPosts: %j', req.body);
};

/**
 * 1. Retrieve random posts
 * 2. Send status 200 and { payload: posts || [] } in case of success
 * 3. In case of error pass AppError(error.message) to next function
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 * @param {*} next Function which is used to pass request execution flow to next middleware, if needed
 */
const getPostById = async (req, res, next) => {
  logger.log('debug', 'getPostById: %j', req.body);
};

export { getPosts, addPosts, attachMedia, getPostById };
