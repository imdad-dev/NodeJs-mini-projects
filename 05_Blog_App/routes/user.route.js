import User from "../models/user.model.js";
import express from "express";
import { handleUserSignup  , handleUserLogin ,UserProfile ,userDashboardDisplay  , editUserProfile } from "../controller/user.controller.js";

const router = express.Router();


router.get("/signup" ,(req , res)=>{
  return res.render("signup"); 
})

router.get("/login" ,(req , res)=>{
    return res.render("login");
})

router.post("/signup" , handleUserSignup);
router.post("/login" ,handleUserLogin );

// logout 
 router.get("/logout" , (req , res)=>{
  return res.clearCookie("token").redirect("/");
 })

 //profile 
 router.get("/profile" , UserProfile)
 router.get(`/dashboard` , userDashboardDisplay)

 // edit -profile 
 router.get("/edit-profile" , async (req , res)=>{
  
  console.log(req.user)
  return res.render("edit-profile"  , { user : req.user })
 })
 
 router.post("/edit-profile" ,editUserProfile )

export default router;