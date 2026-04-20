import express from 'express';
import {
  showRegister,
  registerUser,
  showLogin,
  loginUser,
  logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

// ── Register ────────────────────────────────────────────
router.get('/register', showRegister);
router.post('/register', registerUser);

// ── Login ───────────────────────────────────────────────
router.get('/login', showLogin);
router.post('/login', loginUser);

// ── Logout ──────────────────────────────────────────────
router.get('/logout', logoutUser);

export default router;