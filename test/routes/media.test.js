/* eslint-disable no-unused-expressions */
import { diskStorageSingle } from '../../middlewares/diskStorage';
import * as mediaController from '../../controllers/mediaController';
import * as commentController from '../../controllers/commentController';
import mediaRouter from '../../routes/media';

describe('MediaRouter', () => {
  it('GET getPosts', () => {
    expect(mediaRouter.stack).to.have.lengthOf(6);
    expect(mediaRouter.stack[0].route.path).to.be.equal('');
    expect(mediaRouter.stack[0].route.stack[0].method).to.be.equal('get');
    expect(mediaRouter.stack[0].route.stack[0].name).to.be.equal('getPosts');
    expect(mediaRouter.stack[0].route.stack[0].handle).to.be.equal(mediaController.getPosts);
  });
  it('POST addPosts', () => {
    expect(mediaRouter.stack[1].route.path).to.be.equal('');
    expect(mediaRouter.stack[1].route.stack[0].method).to.be.equal('post');
    expect(mediaRouter.stack[1].route.stack[0].name).to.be.equal('addPosts');
    expect(mediaRouter.stack[1].route.stack[0].handle).to.be.equal(mediaController.addPosts);
  });
  it('POST /content/image', () => {
    expect(mediaRouter.stack[2].route.path).to.be.equal('/content/image');
    expect(mediaRouter.stack[2].route.stack[0].method).to.be.equal('post');
    expect(mediaRouter.stack[2].route.stack[0].name).to.be.equal('multerMiddleware');
    expect(mediaRouter.stack[2].route.stack[0].handle).to.be.equal(diskStorageSingle);
    expect(mediaRouter.stack[2].route.stack[1].method).to.be.equal('post');
    expect(mediaRouter.stack[2].route.stack[1].name).to.be.equal('attachMedia');
    expect(mediaRouter.stack[2].route.stack[1].handle).to.be.equal(mediaController.attachMedia);
  });
  it('GET /:mediaId', () => {
    expect(mediaRouter.stack[3].route.path).to.be.equal('/:mediaId');
    expect(mediaRouter.stack[3].route.stack[0].method).to.be.equal('get');
    expect(mediaRouter.stack[3].route.stack[0].name).to.be.equal('getPostById');
    expect(mediaRouter.stack[3].route.stack[0].handle).to.be.equal(mediaController.getPostById);
  });
  it('GET /:mediaId/comments', () => {
    expect(mediaRouter.stack[4].route.path).to.be.equal('/:mediaId/comments');
    expect(mediaRouter.stack[4].route.stack[0].method).to.be.equal('get');
    expect(mediaRouter.stack[4].route.stack[0].name).to.be.equal('getPostComments');
    expect(mediaRouter.stack[4].route.stack[0].handle).to.be.equal(
      commentController.getPostComments,
    );
  });
  it('POST /:mediaId/comments', () => {
    expect(mediaRouter.stack[5].route.path).to.be.equal('/:mediaId/comments');
    expect(mediaRouter.stack[5].route.stack[0].method).to.be.equal('post');
    expect(mediaRouter.stack[5].route.stack[0].name).to.be.equal('addPostComments');
    expect(mediaRouter.stack[5].route.stack[0].handle).to.be.equal(
      commentController.addPostComments,
    );
  });
});
