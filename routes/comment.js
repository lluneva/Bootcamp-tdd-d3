import express from 'express';
import * as commentController from '../controllers/commentController';

const router =  express.Router();
router.delete('/:commentId', commentController.deleteComment);


export default router;
