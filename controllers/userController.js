import getUserByToken from '../utils/getUserFromToken';

const logger = require('../utils/logger')('logController');

const getUserInfo = async (req, res) => {
  logger.log('debug', 'logIn: %j', req.body);
  const user = await getUserByToken(req);
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
