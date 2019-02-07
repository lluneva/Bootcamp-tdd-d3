// TODO Task.6
/**
 * 1. Define router with get method on path /self and getUserInfo handler
 */

const router = require('express').Router();
import { getUserInfo } from '../controllers/userController';

router.get('/self', getUserInfo);

export default router;
