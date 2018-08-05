import express from 'express';

import asyncMiddleware from '../middlewares/asyncMiddleware';
import download from '../controllers/downloadController';

const router = express.Router();

router.get('/download', asyncMiddleware(download));

export default router;
