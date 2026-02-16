import express  from "express";
import connectMongo from "./DB/connect.js";
import path from "path";
import userRoute from "./routes/user.route.js"


const app = express();
const PORT = 8000;

// mongo Connect
connectMongo("mongodb://localhost:27017/blogify");

//set engin
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"))

app.get("/" ,(req , res)=>{
     
    res.render("home");
})

app.use("/user" , userRoute)

app.listen(PORT , ()=>{
console.log(`Server is lisnetng at https://localhost:${PORT}`);
})
