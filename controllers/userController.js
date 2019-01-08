const logger = require('../utils/logger')('logController');

// TODO Task.4

/**
 * This endpoint should send user back his account info:
 * 1. send back User data attached to req by authenticate middleware to the client {
    payload: {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  }
 * 2. 
 *
 * @param {*} req HTTP request parsed to object by bodyparser with data coming from the client
 * @param {*} res Response object we are using to send HTTP response back to the client
 */
const getUserInfo = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.body);
};

export { getUserInfo };
