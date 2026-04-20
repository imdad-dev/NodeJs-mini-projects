import User from '../models/user.models.js';

// ── Show Register Page ──────────────────────────────────
export const showRegister = (req, res) => {
  if (req.session.userId) return res.redirect('/chat');
  res.render('register', { error: null });
};

// ── Register User ───────────────────────────────────────
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.render('register', { error: 'Username or email already taken.' });
    }

    // Create new user (password auto-hashed via pre-save hook)
    const user = await User.create({ username, email, password });

    // Auto login after register
    req.session.userId = user._id;
    req.session.username = user.username;

    res.redirect('/chat');
  } catch (err) {
    console.error('Register error:', err.message);
    res.render('register', { error: 'Something went wrong. Please try again.' });
  }
};

// ── Show Login Page ─────────────────────────────────────
export const showLogin = (req, res) => {
  if (req.session.userId) return res.redirect('/chat');
  res.render('login', { error: null });
};

// ── Login User ──────────────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password.' });
    }

    // Save session
    req.session.userId = user._id;
    req.session.username = user.username;

    res.redirect('/chat');
  } catch (err) {
    console.error('Login error:', err.message);
    res.render('login', { error: 'Something went wrong. Please try again.' });
  }
};

// ── Logout User ─────────────────────────────────────────
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error('Logout error:', err.message);
    res.redirect('/auth/login');
  });
};