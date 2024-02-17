import { Router } from 'express';
import { signup } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/signup', upload.single('avatar'), signup);

export default router;
