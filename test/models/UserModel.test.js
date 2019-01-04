/* eslint-disable no-unused-expressions */
import { save, getUserByName, getUserByEmail, userSchema, UserModel } from '../../models/UserModel';

describe('UserModel', async () => {
  it('userSchema correct', async () => {
    expect(userSchema.obj).to.have.keys({
      username: { type: String, trim: true, unique: true, required: true },
      email: { type: String, trim: true, unique: true, required: true },
      rehashedPassword: { type: String, unique: true, required: true },
    });
  });
  it('save works', async () => {
    const saveModel = sinon.stub().resolves();
    UserModel.prototype.save = saveModel;
    const comment = {
      username: 'username',
      email: 'email',
      rehashedPassword: 'rehashedPassword',
    };
    await save(comment);
    expect(saveModel).to.be.calledOnce;
  });
  it('getUserByName works', async () => {
    const username = 'username';
    const findModel = sinon.stub().resolves();
    UserModel.findOne = findModel;
    await getUserByName(username);
    expect(findModel).to.be.calledWith({ username });
  });
  it('getUserByEmail works', async () => {
    const email = 'email';
    const findModel = sinon.stub().resolves();
    UserModel.findOne = findModel;
    await getUserByEmail(email);
    expect(findModel).to.be.calledWith({ email });
  });
});
