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


export  { handleUserSignup ,}