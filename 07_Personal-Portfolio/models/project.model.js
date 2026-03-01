import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({ 
  
    title : {
        type : String , 
        required : true 
    }  ,
    coverImage : {
              type : String , 
        required : false ,
    } ,

    description : {
              type : String , 
        required : true 
    } ,

    projectURL : {
              type : String , 
        
    }
    
} , { timestamps : true })

 const Project = mongoose.model("project" , projectSchema);


 export default Project;