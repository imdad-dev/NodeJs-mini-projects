const express = require('express');
const userRoutes = require('./routes/users.routes.js')

const PORT = 8000;

const app = express();

app.use( express.json());

app.use("/api/users" , userRoutes);

app.listen(PORT , ()=>{
    console.log(`Server is listening on port : ${PORT}`);
})