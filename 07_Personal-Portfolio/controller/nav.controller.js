import nodemailer from 'nodemailer';

import Project from "../models/project.model.js";
import User from "../models/user.js"
import Skill from "../models/skill.model.js" 

const getHomePage = async (req, res) => {
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
};

const getProjectSection =async (req , res)=>{

  const projects = await Project.find ();  // fetch all projectc
  console.log(projects)
  res.render("project" , { 
    projects 
  })
}

const getSkillSection = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.render('skills', { skills });
  } catch (err) {
    console.error(err);
    res.render('skills', { skills: [] });
  }
}


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

const contactFormSubmit = async (req, res) => {
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
}

export {
    getHomePage ,
    getProjectSection ,
    getSkillSection ,
    contactFormSubmit
}