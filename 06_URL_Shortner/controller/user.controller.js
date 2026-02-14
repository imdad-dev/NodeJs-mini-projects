const User = require("../models/user.model.js")
 
const { setUser } = require("../utils/auth.uril.js")

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
        return res.render("login" , {
            error : "Invalid email or password"
        })
    }
 
   const token = setUser(user);

 res.cookie("jwt" ,token)   
 

        return res.redirect("/home")
}

module.exports = { userSignup ,userLogin }