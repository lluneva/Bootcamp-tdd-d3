/* eslint-disable no-unused-expressions */
import {
  save,
  getMediaById,
  getMediaByUser,
  mediaSchema,
  MediaModel,
} from '../../models/MediaModel';

describe('MediaModel', async () => {
  it('mediaSchema correct', async () => {
    expect(mediaSchema.obj).to.have.keys({
      username: { type: String, unique: false, required: true },
      path: { type: String, unique: true, required: true },
    });
  });
  it('save works', async () => {
    const saveModel = sinon.stub().resolves();
    MediaModel.prototype.save = saveModel;
    const comment = {
      username: 'username',
      path: 'path',
    };
    await save(comment);
    expect(saveModel).to.be.calledOnce;
  });
  it('getMediaById works', async () => {
    const id = 'mediaId';
    const findModel = sinon.stub().resolves();
    MediaModel.findOne = findModel;
    await getMediaById(id);
    expect(findModel).to.be.calledWith({ _id: id });
  });
  it('getMediaByUser works', async () => {
    const userName = 'username';
    const findModel = sinon.stub().resolves();
    MediaModel.findOne = findModel;
    await getMediaByUser(userName);
    expect(findModel).to.be.calledWith({ userName });
  });
});
