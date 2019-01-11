import express from 'express';

import { diskStorageSingle } from '../middlewares/diskStorage';
import * as mediaController from '../controllers/mediaController';

const router = express.Router();

router.get('', mediaController.getPosts);
router.post('', mediaController.addPosts);
router.post('/content/image', diskStorageSingle, mediaController.attachMedia);
router.get('/:mediaId', mediaController.getPostById);

export default router;
