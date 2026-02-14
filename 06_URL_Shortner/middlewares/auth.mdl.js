 
const { getuser} = require("../utils/auth.uril.js");

const restrictToLoggedUserOnly = async(req , res , next) => {
    
    // console.log(req)  
    const userUid = req.cookies?.uid; 
 

    if(! userUid) {
        return res.redirect("/login");
    }

    const user = getuser(userUid);
    console.log(user);

    if(!user) {
        return res.redirect("/login");
    }

    req.user = user;
  next()   ;
}


async function checkAuth(req , res ,next){
     const userUid = req.cookies?.uid; 

    const user = getuser(userUid);
    req.user = user;
  next()   
}

 module.exports = { 
    restrictToLoggedUserOnly ,
    checkAuth 
}