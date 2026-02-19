import Blog from "../models/blog.model.js"
import Comment from "../models/comment.model.js"; 

const AddNewBlog  =(  async (req , res) =>{

// Safety check
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing. Did you forget express.json() middleware?"
      });
    }

    const { title , body} = req.body;

    const blog = await Blog.create ({
        title , 
        body , 
        createdBy : req. user._id , 
        coverImage : `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

// ----------view or read blog Content ------------//

const viewBlogContent = async (req , res) =>{
  const blog = await Blog.findById(req.params.id).populate("createdBy")  // populate --> id wise view blog only 
  const  comments = await Comment.find({blogId : req.params.id}).populate("createdBy")

  return res.render ("blog" , {
    user : req.user ,
    blog , 
    comments ,
    
  })
}

export { AddNewBlog  ,viewBlogContent }