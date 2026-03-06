import jwt from "jsonwebtoken"
import crypto from "crypto";


const createTokenForUser = (user)=>{
 try {
        const payload ={
        _id : user._id ,
        username : user.username ,
        email : user.email 
    }

    const token =jwt.sign(payload ,process.env.JWT_SECRET , {expiresIn : "1d"});
    return token;

 } catch (error) {
    
    console.error("Token Generate Error : " , error);
 }
}

const validateToken = (token)=>{
    if (!token) return null;

    try {
      return   jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
         return null;
    }
}


export {
    createTokenForUser,
    validateToken 
}