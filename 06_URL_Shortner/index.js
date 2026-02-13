const express = require('express');
const connectDB = require("./DB/connectDB.js")
const urlRoutes = require("./routes/url.routes.js");
const path = require("path");
const staticRoute = require("./routes/static.route.js");
const userRoute = require("./routes/user.route.js");
const {restrictToLoggedUserOnly } = require("./middlewares/auth.mdl.js")
const cookieParser = require("cookie-parser");
 

const app = express();
const PORT = 3000;


// mongo Connect 
connectDB("mongodb://localhost:27017/urlShortner") ;

// view engin ejs
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"))

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url"  , urlRoutes);
app.use("/user" ,restrictToLoggedUserOnly , userRoute);

app.use("/" , staticRoute) ; 


app.listen(PORT , ()=>{
    console.log(`Sever is lisening at http://localhost:${PORT}`);
})