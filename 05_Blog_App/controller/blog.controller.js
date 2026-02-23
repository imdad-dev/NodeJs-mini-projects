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
  const blog = await Blog.findById(req.params.id).populate("createdBy")     // populate --> id wise view blog only 
  const  comments = await Comment.find({blogId : req.params.id}).populate("createdBy")

  return res.render ("blog" , {
    user : req.user ,
    blog , 
    comments ,
    
  })
}

const deleteBlog = async (req , res)=>{
  try {
    await Blog.findByIdAndDelete(req.params.blogId)
    return  res.redirect('/user/dashboard');
  } catch (err) {
    res.status(500).send('Could not delete');
  }
}

// edit blog post get method and render editBlog page 
const renderEditBlog = async (req , res) =>{
  try {
   const blog =  await Blog.findById( req.params.blogId );
   if(! blog) {
    return res.status(404).send("blog Not Found : 404")
   }
return res.render("editBlog" , {
  blog , 
  title : "Edit blog post" ,
  user : req.user ,
})

  } catch (error) {
    return res.status(500).send("Server Error" , error)
  }
}

// updateBlog put method 

const updateBlog = async (req, res) => {
  try {
    const { title, coverImage, body} = req.body;
    const id = req.params.blogId;

    console.log("Updating blog:", id);           // debug
    console.log("New data:", { title, coverImage, body });

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { title, coverImage, body } },   // ← safer
      { new: true, runValidators: true, omitUndefined: true }
    );

    if (!updatedBlog) {
      console.log("Blog not found:", id);
      return res.status(404).json({ message: "Blog not found" });
      // or render error page
    }

    console.log("Updated successfully:", updatedBlog._id);

    return res.redirect(`/blog/${id}`);
      // better for confirmation

  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
    // or res.render("error", { message: "Failed to update" });
  }
};

export { AddNewBlog  , 
  viewBlogContent , 
  deleteBlog ,  
  renderEditBlog ,
updateBlog , }