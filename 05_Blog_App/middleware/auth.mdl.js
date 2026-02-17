import { validateToken } from "../utils/auth.util.js";

const checkForAuthinticationCookie = (cookieName) =>{
    return (req , res , next)=>{

        const tokenCookieValue = req.cookies?.[cookieName];

        if(!tokenCookieValue) return next();

        try {
            
        const payload = validateToken(tokenCookieValue);
req.user = payload ; 
return next();

        } catch (error) {
            console.error("token Authintication Failed" , error.message);
            return next();
        }
    }
}

export { checkForAuthinticationCookie}