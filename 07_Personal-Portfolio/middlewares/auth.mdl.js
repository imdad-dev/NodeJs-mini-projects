import { validateToken } from "../utils/auth.js"

const authMiddleware = (req, res, next) => {
  const tokenAuthValue = req.header('Authorization');
  console.log(tokenAuthValue)
const token = tokenAuthValue.split("Bearer ")[1];
console.log(token)

  if (!token) return res.redirect('/login');
  try {
    const decoded =  validateToken(token)
    req.user = decoded;
    next();
  } catch (err) { res.redirect('/login'); }
};


export { 
    authMiddleware ,
}