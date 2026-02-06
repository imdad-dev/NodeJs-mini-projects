const User= require("../models/user.models.js");

const getUsers = async (req , res)=>{

    try {
        
          const users = await User.findAll();

    if(!users) {
         res
        .status(404)
        .json({message : "User Not found!"})            
    }

    res
    .status(200)
    .json(users);

    } catch (error) {
        res.status(500).json({msg : "GetUser internal Error" , Error: error.msg})
    }

}


const getUserById = async( req , res)=>{
    try {
const user = await User.findById(req.params.id)

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
              const user = await User.create(req.body);
 res.status(201)
 .json(user)

    } catch (error) {
        res.status(500).json({msg : "create user internal Error" , Error: error.msg}) 
    }
}

const updateUser =async (req  , res)=>{
try {
    
    const user = await User.findById(req.params.id);

    if(!user) {
          res.status(404).json({ msg: "User not Found!"});
    }


} catch (error) {
    
}

}

const deleteUser = async (req, res)=>{

try {
    
    const id = Number(req.params.id);
    const index =await User.findIndex(user => user.id === id);
if(index = -1 ){
    res.status(404).end("Nothing to deleted");
}
    User.splice(index , 1);
    res.status(400).json({ msg: "delete Succesfully"});

} catch (error) {
            res.status(500).json({msg : " internal server  Error" , Error: error.msg}) 

}

}

module.exports = {
     getUsers ,
      getUserById ,
      createUser ,

}
