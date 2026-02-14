 
const { getUser} = require("../utils/auth.uril.js");

const restrictToLoggedUserOnly = async(req , res , next) => {

const token = req.cookies?.jwt;   
//  console.log(token)

    if(!token) {
        return res.redirect("/login");
    }

    const user = getUser(token);
    // console.log(user);

    if(!user) {
        return res.redirect("/login");
    }

    req.user = user;
  next();
}


async function checkAuth(req , res ,next){

 const token= req.cookies?.jwt;

 
    const user = getUser(token);
    req.user = user;
  next()   
}

 module.exports = { 
    restrictToLoggedUserOnly ,
    checkAuth 
}