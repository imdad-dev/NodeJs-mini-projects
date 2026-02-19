import Blog from "../models/blog.model.js"
 

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
    return res.redirect(`blog/${blog._id}`)
})

const viewBlogContent = async (req , res) =>{
  const blog = await Blog.findById(req.params.id).populate("createdBy")  // populate --> id wise view blog only 
   
  return res.render ("blog" , {
    user : req.user ,
    blog , 
    
  })
}

export { AddNewBlog  ,viewBlogContent }