import jwt from "jsonwebtoken";
import crypto from "crypto"

const secret = crypto.randomBytes(64).toString(); // --> usaully write .env file 

const createTokenForUser  = (user)=>{
    const payload = {
        _id :user. _id ,
        fullName : user.fullName ,
        email : user.emal ,
        profileImageURL : user.profileImageURL ,
        role : user.role ,
    }

    const token =jwt.sign(payload , secret);

    return token; 
}


const validateToken = (token)=>{

    if(!token)  return null;

  try {
    return jwt.verify(token , secret);

  } catch (error) {
    return null; 
  }
}

export { 
    createTokenForUser , 
    validateToken ,
}