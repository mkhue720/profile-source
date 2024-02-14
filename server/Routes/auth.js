import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../Controllers/authController.js';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:id/:token', resetPassword);
export default router;