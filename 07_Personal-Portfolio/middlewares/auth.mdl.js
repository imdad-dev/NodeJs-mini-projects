const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.redirect('/login');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) { res.redirect('/login'); }
};


export { 
    authMiddleware ,
}