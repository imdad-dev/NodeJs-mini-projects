import mongoose  from "mongoose";

const commentSchema = new mongoose.Schema({ 
    content : {
        type : String ,
        required : true ,
    } ,

     blogId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "blog"
     } ,
     createdBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user"
     } ,


} , { timestamps : true})


const Comment = mongoose.model("comment" ,commentSchema);

export default Comment ;