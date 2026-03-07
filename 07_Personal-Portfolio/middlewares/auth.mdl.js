import { validateToken } from "../utils/auth.js"

const authMiddleware = async (req, res, next) => {
  console.log(req.headers)
 const authHeader = req.headers.authorization;

  console.log("AuthHeader" , authHeader)
// Early check: If no header or doesn't start with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Auth error: No or invalid Authorization header', { authHeader }); // Debug log
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

const token = authHeader.split("Bearer ")[1];
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