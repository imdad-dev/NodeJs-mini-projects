import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── Send messages to Claude AI and get reply ────────────
const getAIResponse = async (messages) => {
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: messages,
  });

  return response.content[0].text;
};

export default getAIResponse;