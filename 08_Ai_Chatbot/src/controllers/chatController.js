import Conversation from '../models/conversation.models.js';
import getAIResponse from '../utils/aiHelper.js';

// ── Get Chat Dashboard ──────────────────────────────────
export const getChatDashboard = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.session.userId })
      .sort({ updatedAt: -1 })
      .select('title updatedAt');

    res.render('chat', {
      conversations,
      activeConversation: null,
      username: req.session.username,
    });
  } catch (err) {
    console.error('Dashboard error:', err.message);
    res.redirect('/auth/login');
  }
};

// ── Create New Conversation ─────────────────────────────
export const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.create({
      userId: req.session.userId,
      title: 'New Conversation',
      messages: [],
    });

    res.redirect(`/chat/${conversation._id}`);
  } catch (err) {
    console.error('Create conversation error:', err.message);
    res.redirect('/chat');
  }
};

// ── Get Single Conversation ─────────────────────────────
export const getConversation = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.session.userId })
      .sort({ updatedAt: -1 })
      .select('title updatedAt');

    const activeConversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!activeConversation) return res.redirect('/chat');

    res.render('chat', {
      conversations,
      activeConversation,
      username: req.session.username,
    });
  } catch (err) {
    console.error('Get conversation error:', err.message);
    res.redirect('/chat');
  }
};

// ── Send Message + Get AI Reply ─────────────────────────
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Add user message
    conversation.messages.push({ role: 'user', content: message });

    // Update title from first message
    if (conversation.messages.length === 1) {
      conversation.title = message.slice(0, 40) + (message.length > 40 ? '...' : '');
    }

    // Build messages array for Claude API
    const apiMessages = conversation.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Get AI reply
    const aiReply = await getAIResponse(apiMessages);

    // Add AI reply to conversation
    conversation.messages.push({ role: 'assistant', content: aiReply });

    await conversation.save();

    res.json({
      success: true,
      userMessage: message,
      aiReply,
      conversationTitle: conversation.title,
    });
  } catch (err) {
    console.error('Send message error:', err.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};

// ── Delete Conversation ─────────────────────────────────
export const deleteConversation = async (req, res) => {
  try {
    await Conversation.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Delete conversation error:', err.message);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
};