/* eslint-disable no-unused-expressions */
import { diskStorageSingle } from '../../middlewares/diskStorage';
import * as mediaController from '../../controllers/mediaController';
import mediaRouter from '../../routes/media';

describe('MediaRouter', () => {
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
});
