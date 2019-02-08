import express from 'express';
import {getPosts, addPosts, attachMedia} from '../controllers/mediaController'
import { getPostById } from '../models/PostModel';
import {diskStorageSingle} from '../middlewares/diskStorage'
// TODO Task.4

/**
 * Define router
 * 1. get '' - mediaController.getPosts
 * 2. post '' - mediaController.addPosts
 * 3. post '/content/image' - diskStorageSingle, mediaController.attachMedia
 * 4. get '/:mediaId' - mediaController.getPostById
 *
 */
const router = express.Router();

router.get('', getPosts);
router.post('', addPosts);
router.post('/content/image', diskStorageSingle, attachMedia );
router.get('/:mediaId', getPostById )




export default router;
