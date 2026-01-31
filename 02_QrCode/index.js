const express = require('express');
const qrcode = require('qrcode');

const inquirer = require('inquirer');

const app = express();
const PORT = 3000;

 app.use(express.urlencoded({extended: true}));
 app.use(express.json());

 app.set("view engine" ,"ejs");
 app.set("views" , "views");

 app.get('/' , (req,res)=>{
    res.render('home');
 })

// middleWare by Defualt 
app.use( (req , res, next)=>{
  res.locals.error= null;
  res.locals.qrCode= null
  res.locals.url = "";
  next();
})

 app.post("/generate" , async (req, res )=>{

const {url , color, size} = req.body;
//  console.log( url,color,size)


try {
 
   const qrCode = await qrcode.toDataURL(url , 
    { 
      color: { dark: color} ,
      width : size
    } 
   );
     
   res.render('home' , {qrCode , url , color,size});

} catch (error) {
  res.render('home' ,{error: "Qr Generate Error"});
}
 })

app.listen(PORT, ()=>{
    console.log(`Server is listening on port : ${PORT}`);
})