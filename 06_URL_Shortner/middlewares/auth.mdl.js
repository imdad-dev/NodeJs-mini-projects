const { createPromptModule } = require("inquirer");
const { getuser} = require("../utils/auth.uril.js");

const restrictToLoggedUserOnly = async(req , res , next) => {
    console.log(req.cookies)  // [object : null]
    const userUid = req.cookies.uid; 
    console.log(userUid)  // undefind
    

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


 module.exports = { 
    restrictToLoggedUserOnly ,
}