/* eslint-disable no-unused-expressions */
import {
  save,
  getPostByUser,
  getRandomPosts,
  getPostById,
  postSchema,
  PostModel,
} from '../../models/PostModel';

describe('MediaModel', async () => {
  it('mediaSchema correct', async () => {
    expect(postSchema.obj).to.have.keys({
      title: { type: String, trim: true, unique: false, required: true },
      username: { type: String, required: true, unique: false },
      media: {
        contentId: { type: String, unique: true, required: true },
        path: { type: String, unique: true, required: true },
      },
    });
  });
  it('save works', async () => {
    const saveModel = sinon.stub().resolves();
    PostModel.prototype.save = saveModel;
    const comment = {
      title: 'title',
      username: 'username',
      media: {
        contentId: 'contentId',
        path: 'path',
      },
    };
    await save(comment);
    expect(saveModel).to.be.calledOnce;
  });
  it('getPostByUser works', async () => {
    const username = 'username';
    const findModel = sinon.stub().resolves();
    PostModel.findOne = findModel;
    await getPostByUser(username);
    expect(findModel).to.be.calledWith({ username });
  });
  it('getPostById works', async () => {
    const id = 'id';
    const findModel = sinon.stub().resolves();
    PostModel.findById = findModel;
    await getPostById(id);
    expect(findModel).to.be.calledWith({ _id: id });
  });
  it('getRandomPosts works', async () => {
    const findModel = sinon.stub().resolves();
    PostModel.find = findModel;
    await getRandomPosts();
    expect(findModel).to.be.calledOnce;
  });
});
