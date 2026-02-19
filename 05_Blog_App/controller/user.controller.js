import User  from '../models/user.model.js';
import Blog from "../models/blog.model.js"
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

    const userBlog= await Blog.find({createdBy : req.params._id}) 

    return res.render("dashboard" , {
       user : req.user ,
        blogs : userBlog ,
    })
}

export  { handleUserSignup ,
    handleUserLogin ,
    UserProfile ,
    userDashboardDisplay
 
}