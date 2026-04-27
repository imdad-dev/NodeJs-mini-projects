import express from "express";
import {Server} from "socket.io"
import http from "http";
import path from "path"
const app = express();
const PORT =8000;

app.set("view engine" , "ejs");
app.use(express.static(path.resolve("./public")));

const io = new Server();

const server =http.createServer(app);
app.use("/" , (req , res)=>{
    res.send("It's Work");
});



server.listen(PORT , ()=>{
    console.log(`Server is Listening at Port : ${PORT}`);
})