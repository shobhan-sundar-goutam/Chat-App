import { Router } from 'express';
import { signup, verifyEmail } from '../controllers/user.controller.js';

const router = Router();

router.post('/signup', signup);
router.get('/verify/:token', verifyEmail);

export default router;
