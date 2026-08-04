// ── Protect routes — must be logged in ─────────────────
export const isLoggedIn = (req, res, next) => {
  if (req.session.userId) return next();
  res.redirect('/auth/login');
};

// ── Prevent logged 
export const isGuest = (req, res, next) => {
  if (!req.session.userId) return next();
  res.redirect('/chat');
};