// TODO Task.5
/**
 * 1. Define router with two post methods /users for registration and /session for logIn
 */

const router = require('express').Router();
import {register, logIn} from '../controllers/authController';

router.post('/users', register);
router.post('/session', logIn);



export default router;
