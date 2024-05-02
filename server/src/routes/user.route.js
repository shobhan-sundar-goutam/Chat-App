import { Router } from 'express';
import { getUserDetails, login, signup, verifyEmail } from '../controllers/user.controller.js';
import isLoggedIn from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify/:token', verifyEmail);
router.get('/profile', isLoggedIn, getUserDetails);

export default router;
