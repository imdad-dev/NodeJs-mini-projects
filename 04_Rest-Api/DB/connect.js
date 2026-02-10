const mongoose = require("mongoose");
 
const connectDB = (url , err) =>{
    return mongoose.connect(url)
    .then( ()=>{
        console.log("mongoDb connected ")
    }
    )
    .catch((err) =>{
        console.log("mongoDb connect Error " , err)
    } )
}

module.exports = connectDB;