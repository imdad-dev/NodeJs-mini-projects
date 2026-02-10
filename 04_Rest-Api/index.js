const express = require('express');
const userRoutes = require('./routes/users.routes.js')
const connectDb = require('./DB/connect.js')
const userInfo = require('./middleware/userInfo.js');

const PORT = 8000;

const app = express();

app.use( express.json());
app.use(express.urlencoded({ extended : false }))
app.use(userInfo("./userData.txt"));

// connect Mongoose 
connectDb('mongodb://localhost:27017/Rest-Api')

app.use("/api/user" , userRoutes);

app.listen(PORT , ()=>{
    console.log(`Server is listening on port : ${PORT}`);
})