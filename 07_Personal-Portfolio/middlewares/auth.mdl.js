import { validateToken } from "../utils/auth.js"

const authMiddleware = async (req, res, next) => {
  console.log(req.headers)
 const token = req.headers.authorization || req.cookies.token;

console.log(token)

  if (!token) return res.redirect('/login');
  try {
    const decoded =  validateToken(token)
    req.user = decoded;
    return next();
  } catch (err) { res.redirect('/login'); }
};


export { 
    authMiddleware ,
}