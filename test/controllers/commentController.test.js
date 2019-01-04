/* eslint-disable no-unused-expressions */
import * as CommentModel from '../../models/CommentModel';
import { getPostComments, addPostComments } from '../../controllers/commentController';
import AppError from '../../errors/AppError';

require('dotenv').config();

describe('commentController', () => {
  describe('.getPostComments(req, res, next)', () => {
    it('successfully retrieved posts, status 200', async () => {
      const req = {
        params: {
          mediaId: 'mediaId',
        },
      };
      const comments = 'comments';
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const getCommentsByPost = sinon.stub(CommentModel, 'getCommentsByPost').resolves(comments);
      await getPostComments(req, res, next);
      expect(getCommentsByPost).to.be.calledWith(req.params.mediaId);
      expect(res.status).to.be.calledWith(200);
      expect(resSend.send).to.be.calledWith({ payload: { comments } });
      expect(next).to.be.not.calledOnce;
      getCommentsByPost.restore(CommentModel);
    });
    it('unsuccessfully retrieved posts, status 400', async () => {
      const req = {
        params: {
          mediaId: 'mediaId',
        },
      };
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const getCommentsByPost = sinon.stub(CommentModel, 'getCommentsByPost').rejects();
      await getPostComments(req, res, next);
      expect(getCommentsByPost).to.be.calledWith(req.params.mediaId);
      expect(res.status).to.be.not.calledOnce;
      expect(resSend.send).to.be.not.calledOnce;
      expect(next.args[0][0]).to.be.instanceOf(AppError);
      getCommentsByPost.restore(CommentModel);
    });
  });
  describe('.addPostComments(req, res, next)', () => {
    it('successfully added comment to post, status 200', async () => {
      const req = {
        user: {
          username: 'username',
        },
        body: {
          text: 'text',
        },
        params: {
          mediaId: 'mediaId',
        },
      };
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const commentSave = sinon.stub(CommentModel, 'save').resolves();
      await addPostComments(req, res, next);
      expect(commentSave).to.be.calledWith({
        message: req.body.text,
        username: req.user.username,
        mediaId: req.params.mediaId,
      });
      expect(res.status).to.be.calledWith(201);
      expect(resSend.send).to.be.calledOnce;
      expect(next).to.be.not.calledOnce;
      commentSave.restore(CommentModel);
    });
    it('unsuccessfully added comment to post, status 400', async () => {
      const req = {
        user: {
          username: 'username',
        },
        body: {
          text: 'text',
        },
        params: {
          mediaId: 'mediaId',
        },
      };
      const resSend = { send: sinon.stub() };
      const res = { status: sinon.stub().returns(resSend) };
      const next = sinon.stub();
      const commentSave = sinon.stub(CommentModel, 'save').rejects();
      await addPostComments(req, res, next);
      expect(commentSave).to.be.calledWith({
        message: req.body.text,
        username: req.user.username,
        mediaId: req.params.mediaId,
      });
      expect(res.status).to.be.not.calledOnce;
      expect(resSend.send).to.be.not.calledOnce;
      expect(next.args[0][0]).to.be.instanceOf(AppError);
      commentSave.restore(CommentModel);
    });
  });
});
