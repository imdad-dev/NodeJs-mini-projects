const express = require('express');
const URL = require("../models/url.model.js")
const router = express.Router();

router.get("/home" , async (req , res) =>{

    if(!req.user) return res.redirect("/login")
    const allURL = await URL.find({createdBy : req.user?._id});
    // console.log(allURL)

    if(!allURL) return res.send("NO any url ? first Generate the URL");

    return res.status(200).render("home" , { urls : allURL});  // urls --> front-ent (must be same)
})

router.get("/signup" , (req , res)=>{
    return res.render("signup");
})


router.get("/login" , (req , res)=>{
    return res.render("login");
})

module.exports= router;