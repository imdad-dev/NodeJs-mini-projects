import mongoose  from "mongoose";

const connectMongo = (url , err)=>{
    return mongoose.connect(url)
    .then(()=>{
  console.log("MongoDb connected✅")
    })
    .catch((err)=>{
  console.error("Mongo Connection Err❌" ,err)
    })
}

export default connectMongo ; 