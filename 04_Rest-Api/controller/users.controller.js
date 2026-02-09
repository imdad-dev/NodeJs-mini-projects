const User= require("../models/user.models.js");

const getUsers = async (req , res)=>{

    try {
        
          const users = await User.find({});

    if(!users) {
         res
        .status(404)
        .json({message : "User Not found!"})            
    }

    res
    .status(200)
    .json(users);

    } catch (error) {

        console.log(error)
        res.status(500).json({msg : "GetUser internal Error" , Error: error.msg})
    }

}


const getUserById = async( req , res)=>{
    try {
const user = await User.findById(req.params.id)
// console.log(user);

    if(!user) {
         res
        .status(404)
        .json({message : "User Not found!"})            
    }

    res
    .status(200)
    .json(user);



    } catch (error) {
     res.status(500).json({msg : "GetUserById internal Error" , Error: error.msg})
    }
} 

const createUser = async (req , res)=>{
    try {
              const { fullName , email , gender } = req.body; 

              const user = await User.create({
                fullName  ,
                email , 
                gender , 
              });
      res
      .status(201)
      .json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg : "create user internal Error" , Error: error.msg}) 
    }
}

const updateUser =async (req  , res)=>{
try {
    const { id } = req.params; // Get ID from URL
        const updateData = req.body; 

    const user = await User.findByIdAndUpdate( 
         id  ,
         updateData ,

         { new: true } ,
         
    )

    if(!user) {
          res.status(404).json({ msg: "User not Found!"});
    }
res.status(200).json({ msg: "User updated successfully", data: user });

} catch (error) {
    
}

}

const deleteUser = async (req, res)=>{

try {
    
    const id = req.params.id;
 const user = await User.findByIdAndDelete(id);

if( !user ){
    res.status(404).end("User not Found!");
}
  
    res.status(200).json({msg :" Delete SuccessfullY"});

} catch (error) {

    console.log(error) ; 
            res.status(500).json({msg : " internal server  Error"})

}

}

module.exports = {
     getUsers ,
      getUserById ,
      createUser ,
   updateUser ,
   deleteUser ,
}
