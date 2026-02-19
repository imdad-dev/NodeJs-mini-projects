import Blog from "../models/blog.model.js"
import express from "express";
import {AddNewBlog } from "../controller/blog.controller.js"
const router = express.Router();
import upload from "../utils/multer.util.js"

router.get("/add-blog" , (req , res)=>{
    return res.render("addBlog");
})


router.post("/add-new" , upload.single("coverImage") , AddNewBlog);


export default router; 