import dotenv from "dotenv"
import express from "express"
import connectMongoDB from "./DB/connectDB.js";
import nodemailer from 'nodemailer';

import Project from "./models/project.model.js";
import User from "./models/user.js"
import { createTokenForUser } from "./utils/auth.js";
import { authMiddleware } from "./middlewares/auth.mdl.js";
import bcrypt from "bcryptjs";

import cookieParser from "cookie-parser";
import Skill from "./models/skill.model.js" 

// contorller 
import {  userSignup ,userLogin } from "./controller/auth.controller.js"
import {getHomePage , getProjectSection , getSkillSection ,contactFormSubmit} from "./controller/nav.controller.js"


const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// mongo connect
connectMongoDB(process.env.MONGODB_URI);

//middlewares
app.use(express.urlencoded({extended :true}))
app.use(cookieParser())

app.set('view engine', 'ejs'); // Set EJS as template engine
app.use(express.static('public')); // Serve static files from public folder

// Home Route - Modern Hero + Skills Preview
// Home Route with Featured Projects
app.get('/',getHomePage);

app.get('/about', (req, res) => { 
  res.render("about")
});
 
app.get("/project" ,getProjectSection)


// Public Skills Page (Dynamic)
app.get('/skills', getSkillSection);

app.get("/contact" , (req , res)=>{
  const success = req.query.success === 'true';
  const error = req.query.success === 'false';
  
  // Render the page and pass the variables to the view
  res.render('contact', { success, error });
})

// Contact Form Route
app.post('/contact', contactFormSubmit);


app.get("/signup" , (req , res)=>{
  res.render("signup");
});
app.post("/signup" , userSignup )


app.get("/login" , (req , res) => res.render("login"));

// Updated login POST route with proper password comparison
app.post("/login", userLogin);


// Admin route example
app.get('/admin',  authMiddleware, (req, res) => res.send("This Adim Area Page where only admin can access!") );

// =============== ADMIN SKILLS ROUTES (Protected) ===============

// Admin Skills Management Page
app.get('/admin/skills', authMiddleware, async (req, res) => {
  const skills = await Skill.find().sort({ category: 1 });
  res.render('admin/skills', { skills });
});

// Add New Skill
app.post('/admin/skills/add', authMiddleware, async (req, res) => {
  try {
    const { category, name, percentage, icon } = req.body;
    const newSkill = new Skill({ category, name, percentage, icon });
    await newSkill.save();
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(500).send('Error adding skill');
  }
});

// Delete Skill
app.post('/admin/skills/delete/:id', authMiddleware, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.redirect('/admin/skills');
  } catch (err) {
    res.status(500).send('Error deleting skill');
  }
});

export default app;