import Blog from "../models/blog.model.js"
import express from "express";
import {AddNewBlog ,viewBlogContent  ,deleteBlog ,editBlog} from "../controller/blog.controller.js"
const router = express.Router();
import upload from "../utils/multer.util.js"
import {handleBlogContent} from "../controller/comment.js"

router.get("/add-blog" , (req , res)=>{
    console.log(req.user)
    return res.render("addBlog" ,{
        user : req.user ,
    });
})


router.post("/add-new" , upload.single("coverImage") , AddNewBlog);
router.get("/:id" , viewBlogContent);

router.post("/comment/:blogId" ,handleBlogContent)
router.post("/delete/:blogId", deleteBlog)
router.get("/edit/:blogId", editBlog)


export default router; 