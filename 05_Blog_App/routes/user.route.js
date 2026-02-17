import User from "../models/user.model.js";
import express from "express";
import { handleUserSignup } from "../controller/user.controller.js";

const router = express.Router();


router.get("/signup" ,(req , res)=>{
  return res.render("signup"); 
})

router.get("/login" ,(req , res)=>{
    return res.render("login");
})

router.post("/signup" , handleUserSignup);
router.post("/login" , (req, res)=>{
  return res.redirect("/");
});

export default router;