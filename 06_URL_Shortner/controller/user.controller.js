const User = require("../models/user.model.js")
const { v4: uuidv4 } = require ("uuid")
const { setuser } = require("../utils/auth.uril.js")

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
const sesseionId = uuidv4();

 setuser(sesseionId , user);

 res.cookie("uid" ,sesseionId)   

        return res.redirect("/home")
}

module.exports = { userSignup ,userLogin }