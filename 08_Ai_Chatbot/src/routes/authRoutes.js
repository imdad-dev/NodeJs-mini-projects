import express from 'express';
import {
  showRegister,
  registerUser,
  showLogin,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';

import { isGuest, isLoggedIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── Register (guests only) ──────────────────────────────
router.get('/register', isGuest, showRegister);
router.post('/register', isGuest, registerUser);

// ── Login (guests only) ─────────────────────────────────
router.get('/login', isGuest, showLogin);
router.post('/login', isGuest, loginUser);

// ── Logout (logged in only) ─────────────────────────────
router.get('/logout', isLoggedIn, logoutUser);

export default router;

 