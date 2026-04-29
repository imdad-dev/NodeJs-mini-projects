import express from "express";
import {Server} from "socket.io"
import http from "http";
import path from "path"
const app = express();
const PORT =8000;

app.set("view engine" , "ejs");
app.use(express.static(path.resolve("./public")));
 
const server =http.createServer(app);

const io = new Server(server);
io.on("connection" , function(server){
    console.log("Connection");
});

app.use("/" , (req , res)=>{
    res.render("index");
});



server.listen(PORT , ()=>{
    console.log(`Server is Listening at Port : ${PORT}`);
})