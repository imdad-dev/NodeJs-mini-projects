const express = require('express');
const connectDB = require("./DB/connectDB.js")
const urlRoutes = require("./routes/url.routes.js");
const path = require("path");
 

const app = express();
const PORT = 3000;


// mongo Connect 
connectDB("mongodb://localhost:27017/url-shortner") ;

// view engin ejs
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"))

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url" , urlRoutes);

app.use("/home" ,(req , res)=>{
    return res.render("home");
} )


app.listen(PORT , ()=>{
    console.log(`Sever is lisening at http://localhost:${PORT}`);
})