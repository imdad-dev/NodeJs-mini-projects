const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullName: {
           type : String ,
        required : true ,
    } ,
     email: {
           type : String ,
        required : true , 
        unique : true ,
     } ,
     gender : {
        type : String ,
     } ,
    
     avatar : {
        type : String ,
        default :  "https://robohash.org/voluptatempariaturducimus.png?size=50x50&set=set1",
     }

} , {
    timestamps : true 
})


const User = mongoose.model("user" ,userSchema);

module.exports = User ; 
