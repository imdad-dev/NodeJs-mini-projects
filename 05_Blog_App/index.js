import express  from "express";
import connectMongo from "./DB/connect.js";
import path from "path";


const app = express();
const PORT = 8000;

// mongo Connect
connectMongo("mongodb://localhost:27017/blogify");

//set engin
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"))

app.use("/" ,(req , res)=>{
     
    res.render("home");
})

app.listen(PORT , ()=>{
console.log(`Server is lisnetng at https://localhost:${PORT}`);
})
