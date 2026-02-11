const express = require('express');
const connectDB = require("./DB/connectDB.js")
const urlRoutes = require("./routes/url.routes.js");
const app = express();
const PORT = 3000;


// mongo Connect 
connectDB("mongodb://localhost:27017/url-shortner") ;

// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url" , urlRoutes);


app.listen(PORT , ()=>{
    console.log(`Sever is lisening at http://localhost:${PORT}`);
})