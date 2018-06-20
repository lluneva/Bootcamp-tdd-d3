import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as mediaController from '../controllers/mediaController';

const router = express.Router();

router.get('', asyncMiddleware(mediaController.getPosts));
router.post('', asyncMiddleware(mediaController.addPosts));
router.post('/content/image', asyncMiddleware(mediaController.attachMedia));
router.get('/media/{media-id}', asyncMiddleware(mediaController.getPostById));
router.get('/media/{media-id}/comments', asyncMiddleware(mediaController.getPostComments));
router.post('/media/{media-id}/comments', asyncMiddleware(mediaController.addPostComments));

export default router;
