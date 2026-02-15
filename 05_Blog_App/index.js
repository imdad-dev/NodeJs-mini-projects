import express  from "express";

const app = express();
const PORT = 8000;

app.use("/" ,(req , res)=>{
    res.status(200).json({msg : "work succesfully"})
})

app.listen(PORT , ()=>{
console.log(`Server is lisnetng at https://locashost:${PORT}`);
})
