 const JWT = require("jsonwebtoken");
const secretKey = "!Imdad@&*^#$~" ; // Gen-> write .env file 
function setUser( user){
 try {
    const payloads = {
   id : user._id ,
   email: user.email ,
   name: user.name ,
    }
    return JWT.sign(payloads, secretKey);
 } catch (error) {
    return res.send("Token Not Genrated!")
 }
}

function getUser (token) {
     if(!token) return ;

     try {
       return  JWT.verify(token , secretKey);
     } catch (error) {
        return null;
     }
}

module.exports = { 
       setUser , 
       getUser , 
}