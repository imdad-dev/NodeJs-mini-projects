import express  from "express";
import connectMongo from "./DB/connect.js";
import path from "path";
import userRoute from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import {checkForAuthinticationCookie} from "./middleware/auth.mdl.js"
import Blog from "./models/blog.model.js"
import blogRoute from "./routes/blog.route.js"

const app = express();
const PORT = 8000;

// mongo Connect
connectMongo("mongodb://localhost:27017/blogify");

//set engine
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"))

//middleware 
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.resolve("./public")))
app.use(cookieParser());
app.use(checkForAuthinticationCookie("token"))


app.get("/" ,(req , res)=>{
     console.log(req.user)
    res.render("home" , { 
        user : req.user 
    });
})

app.use("/user" , userRoute)
app.use("/blog" , blogRoute)

app.listen(PORT , ()=>{
console.log(`Server is lisnetng at https://localhost:${PORT}`);
})
