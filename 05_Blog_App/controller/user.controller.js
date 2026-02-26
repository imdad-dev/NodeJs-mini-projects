import User  from '../models/user.model.js';
import Blog from "../models/blog.model.js"
 
import {createTokenForUser } from "../utils/auth.util.js"


const handleUserSignup = async  (req , res) => {

    const { fullName , email , password} = req.body;

const user = await User.create({
    fullName , 
    email , 
    password ,
});
 

return res.redirect("/")
};

const handleUserLogin = async (req , res)=>{
    const { email , password} = req.body;

    try {
        const token = await  User.matchPasswordAndGenerateToken(email ,  password);
console.log(token)
        return res.cookie("token" , token).redirect("/");

    } catch (error) {
        console.log(error)
        return res.render("login" , { err : "Incorrect email or password"})
    }
}

const UserProfile =  (req , res) => {
 
    // console.log(req.user);
    return res.render("profile" , { user : req.user })
}

const userDashboardDisplay = async (req , res) =>{

  const userBlogs = await Blog.find({ createdBy: req.user._id });

    // console.log(userBlogs)

    return res.render("dashboard" , {
       user : req.user ,
        blogs : userBlogs ,
    })
}

const editUserProfile = async (req, res)=>{
    const {fullName , email } =req.body;
     const id = req.user._id;

     const updateProfile = await User.findByIdAndUpdate ( 
        id , 
        { $set : { fullName , email }} ,
        { new : true , runValidators : true}
     )

     if(!updateProfile){
        return res.send("User Not Found 404");
     }

     // Manually refresh the Passport user in the current session
  req.user.fullName = updateProfile.fullName;
  req.user.email    = updateProfile.email;
  
  const user = req.user;
//   console.log("User : ", user)

  // create newToken
        const newToken =  createTokenForUser(user)

        // console.log(newToken)
        return res.cookie("token" , newToken).redirect("/user/profile");


}

export  { handleUserSignup ,
    handleUserLogin ,
    UserProfile ,
    userDashboardDisplay ,
    editUserProfile
 
}