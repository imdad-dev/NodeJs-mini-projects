import mongoose  from "mongoose";

const connectMongo = (url , err)=>{
    return mongoose.connect(url, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    })
    .then(()=>{
  console.log("MongoDb connected✅")
    })
    .catch((err)=>{
  console.error("Mongo Connection Err❌" ,err)
    })
}

export default connectMongo ; 