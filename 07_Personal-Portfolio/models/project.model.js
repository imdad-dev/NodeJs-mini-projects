import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({ 
  
    title : {
        type : String , 
        required : true 
    }  ,
    coverImage : {
              type : String , 
         default : " https://placehold.co/600x400" ,
         
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