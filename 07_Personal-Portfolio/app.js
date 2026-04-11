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
app.get('/', async (req, res) => {
  try {
    // const skills = await Skill.find().sort({ category: 1 }).limit(6);
    const featuredProjects = await Project.find({ featured: true }).limit(3);
    
    res.render('home', { 
      title: 'Imdadul | Full Stack Developer',
      // skills,
      featuredProjects
    });
  } catch (err) {
    console.error(err);
    res.render('home', { skills: [], featuredProjects: [] });
  }
});

app.get('/about', (req, res) => { 
  res.render("about")
});
 
app.get("/project" , async (req , res)=>{

  const projects = await Project.find ();  // fetch all projectc
  console.log(projects)
  res.render("project" , { 
    projects 
  })

})


// Public Skills Page (Dynamic)
app.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.render('skills', { skills });
  } catch (err) {
    console.error(err);
    res.render('skills', { skills: [] });
  }
});

app.get("/contact" , (req , res)=>{
  const success = req.query.success === 'true';
  const error = req.query.success === 'false';
  
  // Render the page and pass the variables to the view
  res.render('contact', { success, error });
})

// 1. Create the transporter once (outside the route)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass:"dgcphteaathzoeur"
  },
  // Add these two to fix your specific environment issues:
  family: 4, 
  tls: {
    rejectUnauthorized: false
  }
});

// Contact Form Route
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !message) {
      return res.render('contact', { 
        error: 'All fields are required!' 
      });
    }

    if (message.length < 10) {
      return res.render('contact', { 
        error: 'Message is too short. Please write more details.' 
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Sent from Imdadul's Portfolio Website</p>
      `
    });

    // Success
    res.render('contact', { success: true });

  } catch (err) {
    console.error('Email error:', err);
    res.render('contact', { 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

app.get("/signup" , (req , res)=>{
  res.render("signup");
})


app.post("/signup" , async(req , res)=>{
  const { username , email , password} = req.body
 await User.create({
  username ,
  email , 
  password
 })

 res.redirect("/")
})


app.get("/login" , (req , res) => res.render("login"));

// Updated login POST route with proper password comparison
app.post("/login", async (req, res) => {
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
});
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