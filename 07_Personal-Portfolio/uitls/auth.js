import jwt from "jsonwebtoken"
import crypto from "crypto";
import Project from "../models/project.model";

const createTokenForUser = (user)=>{
    const payload ={
        _id : user._id ,
        username : user.username ,
        email : user.email 
    }

    const token =jwt.sign(payload ,process.env.JWT_SECRET , {expiresIn : "1d"});
    return token;
}

const validateToken = (token)=>{
    if (!token) return null;

    try {
        jwt.verify(payload , process.env.JWT_SECRET)
    } catch (error) {
         return null;
    }
}


export {
    createTokenForUser,
    validateToken 
}