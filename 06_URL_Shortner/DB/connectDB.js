const mongoose = require("mongoose");


 const connectDB  = (url , err)=>{
    return mongoose.connect(url) 
  .then( ()=> console.log("MongoDB connected ✅")
)
  .catch( (err)=>{
    console.log("err");
  })
    }
 

    module.exports = connectDB ; 