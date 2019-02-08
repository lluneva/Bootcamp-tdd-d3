import * as CommentModel from '../models/CommentModel';
// import * as PostModel from '../models/PostModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logController');

const addPostComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.save({
      message: req.body.text,
      username: req.user.username,
      mediaId: req.params.mediaId,
    });

    res.status(201).send({ payload: { comments } });
  } catch (error) {
    next(new AppError(error.message));
  }
};

const getPostComments = async (req, res, next) => {
  try {
    const comments = await CommentModel.getCommentsByPost(req.params.mediaId);
    res.status(200).send({ payload: { comments: comments || [] } }); // this will be an array
  } catch (error) {
    next(new AppError(error.message));
  }
};

const deleteComment = async (req, res, next) => {
  try {
    // res.send({payload : { params: req.params}});
    await CommentModel.deleteCommentById(req.params.commentId);
    res.status(200).send({payload : {message : `Post with ${id} has been removed`}});
  } catch (error) {
    next(new AppError(error.message));
  }
};

export { deleteComment, addPostComments, getPostComments };
