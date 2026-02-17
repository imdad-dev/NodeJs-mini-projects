import User  from '../models/user.model.js';

const handleUserSignup = async  (req , res) => {

    const { fullName , email , password} = req.body;

const user = await User.create({
    fullName , 
    email , 
    password ,
});
console.log(user)

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


export  { handleUserSignup ,
    handleUserLogin ,
}