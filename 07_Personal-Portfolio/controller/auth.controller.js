
import dotenv from "dotenv"
import express from "express"
import connectMongoDB from "../DB/connectDB.js";
import nodemailer from 'nodemailer';

import User from "../models/user.js"
import Project from "../models/project.model.js";

const userSignup = async(req , res)=>{
  const { username , email , password} = req.body
 await User.create({
  username ,
  email , 
  password
 })

 res.redirect("/");
};

const userLogin = async (req, res) => {
  const { username, email, password } = req.body;

  // Find user by email (or username if preferred – adjust as needed)
  const user = await User.findOne({ email });
  console.log(user) 

  if (!user) {
    return res.render("login", {
      error: "Invalid credentials"  // Unified error message
    });
  }
 

  try {
    // Create and set token (assuming createTokenForUser returns a JWT string)
    const token = createTokenForUser(user);
    console.log( 'Token: ',token)

      return res.cookie("token" , token).redirect("/");
  } catch (error) {
    console.error("Token creation error:", error);  // Log for debugging
    return res.render("login", {
      error: "Login failed – please try again"
    });
  }
}


export { 
     userSignup ,
     userLogin ,
}