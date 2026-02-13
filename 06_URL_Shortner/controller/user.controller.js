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

const userLogin = async (req , res) =>{
    const {email , password} = req.body;

    const user = await User.findOne({email , password});

    if(!user) {
        return res.redirect("/login" , {
            error : "Invalid email or password"
        })

        return res.redirect("/home")
    }
}

module.exports = { userSignup ,userLogin }