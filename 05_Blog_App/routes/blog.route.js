import Blog from "../models/blog.model.js"
import express from "express";

const router = express.Router();


router.get("/add-blog" , (req , res)=>{
    return res.render("addBlog");
})




export default router; 