/* eslint-disable no-unused-expressions */
import { getUserInfo } from '../../controllers/userController';
import userRouter from '../../routes/user';

describe('UserRouter', () => {
  it('GET /self', () => {
    expect(userRouter.stack).to.have.lengthOf(1);
    expect(userRouter.stack[0].route.path).to.be.equal('/self');
    expect(userRouter.stack[0].route.stack[0].method).to.be.equal('get');
    expect(userRouter.stack[0].route.stack[0].name).to.be.equal('getUserInfo');
    expect(userRouter.stack[0].route.stack[0].handle).to.be.equal(getUserInfo);
  });
});
