import express from 'express';
import {
  getChatDashboard,
  createConversation,
  getConversation,
  sendMessage,
  deleteConversation,
} from '../controllers/chatController.js';
import { isLoggedIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── All chat routes protected by isLoggedIn ─────────────
router.use(isLoggedIn);

// ── Dashboard ───────────────────────────────────────────
router.get('/', getChatDashboard);

// ── New Conversation ────────────────────────────────────
router.post('/new', createConversation);

// ── Get Single Conversation ─────────────────────────────
router.get('/:id', getConversation);

// ── Send Message ────────────────────────────────────────
router.post('/:id/message', sendMessage);

// ── Delete Conversation ─────────────────────────────────
router.delete('/:id', deleteConversation);

export default router;