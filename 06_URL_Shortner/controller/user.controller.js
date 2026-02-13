const User = require("../models/user.model.js")

const userSignup = async (req , res) =>{
    const {name , email , password} = req.body;

    await User.create({
        name , 
        email , 
        password , 
    })

    return res.redirect("/home");
}

module.exports = { userSignup }