import mongoose  from "mongoose";


const blogSchema = new mongoose.Schema({

    title : {
        type : String ,
        required : true 
    } ,

    body :{
          type : String ,
        required : true 
    } ,

    coverImage : {
          type : String ,
        required : true 
    } ,
  
    createdBy :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user"
    },

    views: {
        type: Number,
        default: 0
    }

},{timestamps : true})


const Blog = mongoose.model("blog" , blogSchema);

export default Blog;