/**
 * Input Validation & Sanitization Utility
 * Prevents XSS, injection attacks, and enforces constraints
 */

// ── Sanitize text input (remove HTML tags) ──────────────
export const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim();
};

// ── Validate email format ───────────────────────────────
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ── Validate username (3-30 chars, alphanumeric + underscore) ──
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
};

// ── Validate password strength ──────────────────────────
export const validatePassword = (password) => {
  // At least 6 chars
  return password && password.length >= 6;
};

// ── Validate and sanitize chat message ──────────────────
export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') return null;
  
  const sanitized = sanitizeText(message);
  
  // Check length (min 1, max 5000)
  if (sanitized.length < 1 || sanitized.length > 5000) return null;
  
  return sanitized;
};

// ── Validate and sanitize conversation title ────────────
export const validateTitle = (title) => {
  if (!title || typeof title !== 'string') return null;
  
  const sanitized = sanitizeText(title);
  
  // Check length (min 1, max 100)
  if (sanitized.length < 1 || sanitized.length > 100) return null;
  
  return sanitized;
};

// ── Validate MongoDB ObjectId ───────────────────────────
export const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// ── Build validation response ───────────────────────────
export const buildValidationError = (field, message) => {
  return {
    field,
    message,
  };
};

export default {
  sanitizeText,
  validateEmail,
  validateUsername,
  validatePassword,
  validateMessage,
  validateTitle,
  isValidObjectId,
  buildValidationError,
};
