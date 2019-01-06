/* eslint-disable no-unused-expressions */
import { register, logIn } from '../../controllers/authController';
import authRouter from '../../routes/auth';

describe('AuthRouter', () => {
  it('POST /users', () => {
    expect(authRouter.stack).to.have.lengthOf(2);
    expect(authRouter.stack[0].route.path).to.be.equal('/users');
    expect(authRouter.stack[0].route.stack[0].method).to.be.equal('post');
    expect(authRouter.stack[0].route.stack[0].name).to.be.equal('register');
    expect(authRouter.stack[0].route.stack[0].handle).to.be.equal(register);
  });
  it('POST /session', () => {
    expect(authRouter.stack[1].route.path).to.be.equal('/session');
    expect(authRouter.stack[1].route.stack[0].method).to.be.equal('post');
    expect(authRouter.stack[1].route.stack[0].name).to.be.equal('logIn');
    expect(authRouter.stack[1].route.stack[0].handle).to.be.equal(logIn);
  });
});
