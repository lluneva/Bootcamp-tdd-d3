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
  const { user } = req; //   sis principaa izveido jaunu mainigo izvelkot datus no req.body, kas saisina sintaksi
  //paylod mainigajiem, jo nav jaraksta visu laiku req.user._id, req.user.username etc`
  logger.log('info', 'logIn: %j', user.id);
  res.status(200).send({
    payload: {
      id: user._id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    },
  });
};

export { getUserInfo };
