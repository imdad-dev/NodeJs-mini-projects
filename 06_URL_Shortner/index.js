const express = require('express');


const app = express();
const PORT = 3000;


// middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.listen(PORT , ()=>{
    console.log(`Sever is lisening at http://localhos:${PORT}`);
})