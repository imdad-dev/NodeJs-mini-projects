const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── Session ─────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// ── View Engine ─────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// ── Routes (we add these in later tasks) ───────────────
app.get('/', (req, res) => {
  if (req.session.userId) return res.redirect('/chat');
  res.redirect('/auth/login');
});

module.exports = app;