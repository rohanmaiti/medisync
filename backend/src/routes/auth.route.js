import express from 'express';
import { signup, login, logout, updateProfile, checkAuth, sendPasswordResetEmail } from '../controllers/auth.controller.js';
import protectedRoute from '../middlewire/auth.middlewire.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile', updateProfile);

router.post('/forgot-password', sendPasswordResetEmail);

router.get('/check',protectedRoute, checkAuth);

export default router;