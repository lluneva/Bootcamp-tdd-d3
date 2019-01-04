/* eslint-disable no-unused-expressions */
import { getUserInfo } from '../../controllers/userController';

require('dotenv').config();

describe('UserController', () => {
  describe('.getUserInfo(req, res)', () => {
    it('user payload returned, status 200', async () => {
      process.env.AUTH_HEADER_ENABLED = true;
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const user = {
        _id: '_id',
        email: 'email',
        username: 'username',
        createdAt: 'createdAt',
      };
      const req = { user };
      await getUserInfo(req, res);
      expect(res.status).to.be.calledWith(200);
      expect(resSend.send).to.be.calledWith({
        payload: {
          id: user._id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
        },
      });
    });
  });
});
