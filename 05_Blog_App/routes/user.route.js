import User from "../models/user.model.js";
import express from "express";

const router = express.Router();


router.get("/signup" ,(req , res)=>{
  return res.render("signup"); 
})

router.get("/login" ,(req , res)=>{
    return res.render("login");
})

export default router;