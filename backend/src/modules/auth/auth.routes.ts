import { Router } from 'express';
import { registerSchema, loginSchema, refreshSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.schema.js';
import { validateBody } from '../../middleware/validation.middleware.js';
import { register, login, refresh, logout, forgotPassword, resetPassword, me } from './auth.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', validateBody(refreshSchema), refresh);
router.post('/logout', authenticate, logout);
router.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authenticate, validateBody(resetPasswordSchema), resetPassword);
router.get('/me', authenticate, me);

export { router };
