import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ── Send messages to Groq AI and get reply ──────────────
const getAIResponse = async (messages) => {
  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: messages,
    max_tokens: 1024,
  });

  return response.choices[0].message.content;
};

export default getAIResponse;