 import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// ── Send messages to Gemini AI and get reply ────────────
const getAIResponse = async (messages) => {

  // Gemini needs history separate from latest message
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const latestMessage = messages[messages.length - 1].content;

  // Start chat with history
  const chat = model.startChat({ history });

  // Send latest message
  const result = await chat.sendMessage(latestMessage);

  return result.response.text();
};

export default getAIResponse;