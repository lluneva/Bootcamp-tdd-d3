/* eslint-disable no-unused-expressions */
import * as MediaModel from '../../models/MediaModel';
import * as PostModel from '../../models/PostModel';
import { addPosts, attachMedia, getPosts, getPostById } from '../../controllers/mediaController';
import { UPLOAD_FOLDER } from '../../consts';
import AppError from '../../errors/AppError';

require('dotenv').config();

describe('MediaController', () => {
  describe('.addPosts(req, res, next)', () => {
    it('successfully addPosts, status 200', async () => {
      const req = {
        user: {
          username: 'username',
        },
        body: {
          caption: 'caption',
          contentId: 'contentId',
        },
      };
      const path = 'path';
      const post = 'post';
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const getMediaById = sinon.stub(MediaModel, 'getMediaById').resolves({ path });
      const savePost = sinon.stub(PostModel, 'save').resolves(post);
      await addPosts(req, res, next);
      expect(getMediaById).to.be.calledWith(req.body.contentId);
      expect(savePost).to.be.calledWith({
        title: req.body.caption,
        username: req.user.username,
        media: {
          path,
          contentId: req.body.contentId,
        },
      });
      expect(res.status).to.be.calledWith(200);
      expect(resSend.send).to.be.calledWith({ payload: post });
      getMediaById.restore(MediaModel);
      savePost.restore(PostModel);
    });
    it('unsuccessfully addPosts, getMediaById rejects, status 400', async () => {
      const req = {
        user: {
          username: 'username',
        },
        body: {
          caption: 'caption',
          contentId: 'contentId',
        },
      };
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const getMediaById = sinon.stub(MediaModel, 'getMediaById').rejects();
      await addPosts(req, res, next);
      expect(getMediaById).to.be.calledWith(req.body.contentId);
      expect(res.status).to.not.be.calledOnce;
      expect(resSend.send).to.not.be.calledOnce;
      expect(next.args[0][0]).to.be.instanceOf(AppError);
      getMediaById.restore(MediaModel);
    });
    it('unsuccessfully addPosts, save rejects, status 400', async () => {
      const req = {
        user: {
          username: 'username',
        },
        body: {
          caption: 'caption',
          contentId: 'contentId',
        },
      };
      const path = 'path';
      const post = 'post';
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const getMediaById = sinon.stub(MediaModel, 'getMediaById').resolves({ path });
      const savePost = sinon.stub(PostModel, 'save').rejects(post);
      await addPosts(req, res, next);
      expect(getMediaById).to.be.calledWith(req.body.contentId);
      expect(savePost).to.be.calledWith({
        title: req.body.caption,
        username: req.user.username,
        media: {
          path,
          contentId: req.body.contentId,
        },
      });
      expect(res.status).to.not.be.calledOnce;
      expect(resSend.send).to.not.be.calledOnce;
      expect(next.args[0][0]).to.be.instanceOf(AppError);
      getMediaById.restore(MediaModel);
      savePost.restore(PostModel);
    });
  });
  describe('.attachMedia(req, res, next)', () => {
    it('successfully attachMedia, status 200', async () => {
      const req = {
        user: {
          username: 'username',
        },
        file: {
          filename: 'filename',
        },
      };
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const media = { id: 'id' };
      const mediaSave = sinon.stub(MediaModel, 'save').resolves(media);
      await attachMedia(req, res, next);
      expect(mediaSave).to.be.calledWith({
        username: req.user.username,
        path: `/${UPLOAD_FOLDER}/${req.file.filename}`,
      });
      expect(res.status).to.be.calledWith(200);
      expect(resSend.send).to.be.calledWith({
        payload: {
          contentId: media.id,
          path: `/${UPLOAD_FOLDER}/${req.file.filename}`,
        },
      });
      mediaSave.restore(MediaModel);
    });
    it('unsuccessfully attachMedia, status 400', async () => {
      const req = {
        user: {
          username: 'username',
        },
        file: {
          filename: 'filename',
        },
      };
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const media = { id: 'id' };
      const mediaSave = sinon.stub(MediaModel, 'save').rejects(media);
      await attachMedia(req, res, next);
      expect(mediaSave).to.be.calledWith({
        username: req.user.username,
        path: `/${UPLOAD_FOLDER}/${req.file.filename}`,
      });
      expect(res.status).to.not.be.calledOnce;
      expect(resSend.send).to.not.be.calledOnce;
      expect(next.args[0][0]).to.be.instanceOf(AppError);
      mediaSave.restore(MediaModel);
    });
  });
  describe('.getPosts(req, res, next)', async () => {
    it('successfully getPosts, status 200', async () => {
      const req = {};
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const posts = 'posts';
      const getRandomPosts = sinon.stub(PostModel, 'getRandomPosts').resolves(posts);
      await getPosts(req, res, next);
      expect(getRandomPosts).to.be.calledOnce;
      expect(res.status).to.be.calledWith(200);
      expect(resSend.send).to.be.calledWith({ payload: posts });
      getRandomPosts.restore(PostModel);
    });
    it('unsuccessfully getPosts, status 200', async () => {
      const req = {};
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const posts = 'posts';
      const getRandomPosts = sinon.stub(PostModel, 'getRandomPosts').rejects(posts);
      await getPosts(req, res, next);
      expect(res.status).to.not.be.calledOnce;
      expect(resSend.send).to.not.be.calledOnce;
      expect(next.args[0][0]).to.be.instanceOf(AppError);
      getRandomPosts.restore(PostModel);
    });
  });
  describe('.getPostById(req, res, next)', async () => {
    it('successfully getPostById, status 200', async () => {
      const req = { params: { mediaId: '1' } };
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const post = 'post';
      const getPostByIdModel = sinon.stub(PostModel, 'getPostById').resolves(post);
      await getPostById(req, res, next);
      expect(getPostByIdModel).to.be.calledWith(req.params.mediaId);
      expect(res.status).to.be.calledWith(200);
      expect(resSend.send).to.be.calledWith({ payload: post });
      getPostByIdModel.restore(PostModel);
    });
    it('unsuccessfully getPostById, status 400', async () => {
      const req = {};
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const post = 'post';
      const getPostByIdModel = sinon.stub(PostModel, 'getPostById').rejects(post);
      await getPostById(req, res, next);
      expect(res.status).to.not.be.calledOnce;
      expect(resSend.send).to.not.be.calledOnce;
      expect(next.args[0][0]).to.be.instanceOf(AppError);
      getPostByIdModel.restore(PostModel);
    });
  });
});
