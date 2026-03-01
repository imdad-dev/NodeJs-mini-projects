import mongoose, { connect } from "mongoose"; 

const connectMongoDB = (url , err)=>{
    return    mongoose.connect(url)
        .then( ()=> console.log("MongoDB connceted ✅"))
        .catch( (err)=> console.log("MongoDB Connection Error : " , err))
} 


export default connectMongoDB;