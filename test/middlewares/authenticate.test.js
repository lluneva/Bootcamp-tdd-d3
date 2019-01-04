/* eslint-disable no-unused-expressions */
import jwt from 'jsonwebtoken';
import AuthError from '../../errors/AuthError';
import * as UserModel from '../../models/UserModel';
import authenticate from '../../middlewares/authenticate';

require('dotenv').config();

describe('.authenticate(req, res, next)', () => {
  it('authorization registered, status 200', async () => {
    const resSend = { send: sinon.stub() };
    const req = {
      headers: {
        authorization: 'authorization authorization',
      },
    };
    const res = { status: sinon.stub().returns(resSend) };
    const next = sinon.stub();
    const verify = sinon
      .stub(jwt, 'verify')
      .callsArgWith(2, null, { data: { username: 'username' } });
    const getUserByName = sinon.stub(UserModel, 'getUserByName').resolves('user');
    await authenticate(req, res, next);
    expect(verify).to.be.calledWith('authorization', process.env.JWT_SECRET);
    expect(getUserByName).to.be.calledWith('username');
    expect(next).to.be.calledWith();
    getUserByName.restore();
    verify.restore();
  });
  it('authorization failed, bad header, status 400', async () => {
    const resSend = { send: sinon.stub() };
    const req = {
      headers: {
        authorization: 'authorization',
      },
    };
    const res = { status: sinon.stub().returns(resSend) };
    const next = sinon.stub();
    await authenticate(req, res, next);
    expect(next).to.be.calledOnce;
    expect(next.args[0][0]).to.be.instanceOf(AuthError);
  });
  it('authorization failed, broken token,status 400', async () => {
    const resSend = { send: sinon.stub() };
    const req = {
      headers: {
        authorization: 'authorization authorization',
      },
    };
    const res = { status: sinon.stub().returns(resSend) };
    const next = sinon.stub();
    const verify = sinon.stub(jwt, 'verify').callsArgWith(2, null, undefined);
    await authenticate(req, res, next);
    expect(next).to.be.calledOnce;
    expect(next.args[0][0]).to.be.instanceOf(AuthError);
  });
});
