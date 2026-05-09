import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Get AI response from Groq with error handling
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<string>} - AI reply content
 */
const getAIResponse = async (messages) => {
  try {
    // Validate messages
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('Messages array is required and cannot be empty');
    }

    // Validate each message
    messages.forEach((msg, idx) => {
      if (!msg.role || !msg.content) {
        throw new Error(`Message at index ${idx} is missing role or content`);
      }
    });

    // Check API key is configured
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY not configured');
      throw new Error('AI service is not properly configured');
    }

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: messages,
      max_tokens: 1024,
      temperature: 0.7,
    });

    // Validate response
    if (!response.choices || response.choices.length === 0) {
      throw new Error('No response from AI service');
    }

    if (!response.choices[0].message || !response.choices[0].message.content) {
      throw new Error('Invalid response format from AI service');
    }

    return response.choices[0].message.content;

  } catch (err) {
    console.error('AI Response Error:', err.message);

    // Handle specific error types
    if (err.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (err.status === 401) {
      throw new Error('AI service authentication failed');
    } else if (err.status === 500) {
      throw new Error('AI service temporarily unavailable');
    } else if (err.message.includes('timeout')) {
      throw new Error('AI service request timeout. Please try again.');
    }

    // Re-throw custom errors
    if (err.message.includes('not configured') || err.message.includes('not properly')) {
      throw err;
    }

    // Generic error
    throw new Error('Failed to get AI response. Please try again.');
  }
};

export default getAIResponse;