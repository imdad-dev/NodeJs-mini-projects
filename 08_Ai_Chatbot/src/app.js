import express from 'express';
import session from 'express-session';
import path from 'path';
import 'dotenv/config';

const app = express();

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

// ── Session ─────────────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// ── View Engine ─────────────────────────────────────────
app.set('view engine', 'ejs');
app.set("views" , path.resolve("./views"))

// ── Routes (we add these in later tasks) ───────────────
app.get('/', (req, res) => {
  if (req.session.userId) return res.redirect('/chat');
  res.redirect('/auth/login');
});

export default app;