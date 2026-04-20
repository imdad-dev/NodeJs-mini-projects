 import express from 'express';
import session from 'express-session';
import path from 'path';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

// ── Session ─────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

// ── View Engine ─────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

// ── Routes ──────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// ── Home ────────────────────────────────────────────────
app.get('/', (req, res) => {
  if (req.session.userId) return res.redirect('/chat');
  res.redirect('/auth/login');
});

export default app;