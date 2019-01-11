import express from 'express';

import { diskStorageSingle } from '../middlewares/diskStorage';
import * as mediaController from '../controllers/mediaController';

const router = express.Router();

router.get('', mediaController.getPosts);
router.post('', mediaController.addPosts);
router.post('/content/image', diskStorageSingle, mediaController.attachMedia);
router.get('/:mediaId', mediaController.getPostById);

// TODO Task.1
/**
 * Create whole chain of modules to implement comments functionality.
 */
// router.get('/:mediaId/comments', commentController.getPostComments);
// router.post('/:mediaId/comments', commentController.addPostComments);

export default router;
