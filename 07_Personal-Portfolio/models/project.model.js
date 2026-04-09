import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({ 
  
    title : {
        type : String , 
        required : true 
    }  ,
    coverImage : {
              type : String , 
         default :"https://picsum.photos/seed/picsum/200/300",
         
    } ,

    description : {
              type : String , 
        required : true 
    } ,
      longDescription: { type: String },        // For detailed view (optional)

    projectURL : {
              type : String , 
        
    } ,
    
  
 
  category: { 
    type: String, 
    enum: ['Frontend', 'Backend', 'Full Stack','MERN', 'Others'],
    required: true 
  },

  technologies: [String],                   // e.g., ["Node.js", "MongoDB", "Bootstrap"]
  link: String,                             // Live demo link
  github: String,                           // GitHub repo link
  image: String,                            // Image filename (e.g., "project1.jpg")

  featured: { 
    type: Boolean, 
    default: false
 }
    
} , { timestamps : true })

 const Project = mongoose.model("project" , projectSchema);


 export default Project;