import Comment from "../models/comment.model.js";

const handleBlogContent = async (req , res)=>{
    await Comment.create({
        content : req.body.content ,
        blogId : req.params.blogId ,
        createdBy : req.user._id 
    })
    // console.log(req.params)
    return res.redirect(`/blog/${req.params.blogId}`);
}

export { handleBlogContent}