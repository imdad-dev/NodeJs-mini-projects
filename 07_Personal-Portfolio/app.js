import dotenv from "dotenv"
import express from "express"
import connectMongoDB from "./DB/connectDB.js";
import nodemailer from 'nodemailer';

import Project from "./models/project.model.js";
import User from "./models/user.js"
import { createTokenForUser } from "./utils/auth.js";
import { authMiddleware } from "./middlewares/auth.mdl.js";
import bcrypt from "bcryptjs";


const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// mongo connect
connectMongoDB(process.env.MONGODB_URI);

//middlewares
app.use(express.urlencoded({extended :true}))

app.set('view engine', 'ejs'); // Set EJS as template engine
app.use(express.static('public')); // Serve static files from public folder

app.get('/', (req, res) => { 
  res.render("home")
});

app.get('/about', (req, res) => { 
  res.render("about")
});


app.get("/test-db" , async (req, res)=>{

  const project =  await Project.create(  {
    title : "Test title project" ,
   
    description : "This is test portfolio project" ,
    link : "http://imdad-dev/portfolio"

  });
  console.log("prject: " , project);

  res.send(" created project model on mongoDB")

})   

app.get("/project" , async (req , res)=>{

  const projects = await Project.find ();  // fetch all projectc
  console.log(projects)
  res.render("project" , { 
    projects 
  })

})


app.get("/skills" , (req , res)=>{
    res.render("skills")
})

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


app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 2. Wrap in try/catch to handle failures
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Gmail requires 'from' to be the authenticated user
      replyTo: email,               // Use replyTo to get the user's actual email
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: message
    });
    
res.redirect('/contact?success=true');
  } catch (error) {
    console.error('Email failed:', error);
    res.status(500).send('Something went wrong.');
  }
});

app.get("/login" , (req , res) => res.render("login"));

// Updated login POST route with proper password comparison
app.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  // Find user by email (or username if preferred – adjust as needed)
  const user = await User.findOne({ email });

  // Check if user exists and password matches (using bcrypt.compare)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", {
      error: "Invalid credentials"  // Unified error message
    });
  }

  try {
    // Create and set token (assuming createTokenForUser returns a JWT string)
    const token = createTokenForUser(user);
    
    // Set Authorization header and redirect
    // Note: For browser redirects, consider using cookies for token persistence instead of headers
    res.header("Authorization", `Bearer ${token}`);  // Add 'Bearer ' prefix if your middleware expects it
    return res.redirect("/admin");
  } catch (error) {
    console.error("Token creation error:", error);  // Log for debugging
    return res.render("login", {
      error: "Login failed – please try again"
    });
  }
});
// Admin route example
app.get('/admin', authMiddleware, (req, res) => res.send("Admin Area") );

export default app;