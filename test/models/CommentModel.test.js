/* eslint-disable no-unused-expressions */
import { commentSchema, CommentModel, save, getCommentsByPost } from '../../models/CommentModel';

describe('CommentModel', async () => {
  it('commentSchema correct', async () => {
    expect(commentSchema.obj).to.have.keys({
      message: { type: String, trim: true, unique: false, required: true },
      username: { type: String, unique: false, required: true },
      mediaId: { type: String, unique: false, required: true },
    });
  });
  it('save works', async () => {
    const saveModel = sinon.stub().resolves();
    CommentModel.prototype.save = saveModel;
    const comment = {
      message: 'message',
      username: 'username',
      mediaId: 'mediaId',
    };
    await save(comment);
    expect(saveModel).to.be.calledOnce;
  });
  it('getCommentsByPost works', async () => {
    const findModel = sinon.stub().resolves();
    CommentModel.find = findModel;
    const mediaId = 'mediaId';
    await getCommentsByPost(mediaId);
    expect(findModel).to.be.calledWith({ mediaId });
  });
});
