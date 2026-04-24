import express from 'express';
import {
  getChatDashboard,
  createConversation,
  getConversation,
  sendMessage,
  deleteConversation,
  renameConversation 
} from '../controllers/chatController.js';
import { isLoggedIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(isLoggedIn);

router.get('/', getChatDashboard);

// ── GET /new must be BEFORE /:id ────────────────────────
router.get('/new', createConversation);
router.post('/new', createConversation);

router.get('/:id', getConversation);
router.post('/:id/message', sendMessage);
router.patch('/:id/rename', renameConversation);  //
router.delete('/:id', deleteConversation);


export default router;