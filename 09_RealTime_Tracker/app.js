import express from "express";
import {Server} from "socket.io"
import http from "http";
import path from "path"
const app = express();
const PORT =8000;

app.set("view engine" , "ejs");
app.use(express.static(path.resolve("./public")));
 
const server =http.createServer(app);

// store all connected users
const connectedUsers = {};

const io = new Server(server);
io.on("connection" , function(socket){
    socket.on("send-location" , (data)=>{
         const { latitude, longitude, username } = data;

             // save user info on first location emit
        if (!connectedUsers[socket.id]) {
            connectedUsers[socket.id] = { username };

            // Broadcast updated user list to ALL clients
            io.emit("update-user-list", Object.values(connectedUsers));
        }
     io.emit("receive-location" , { id : socket.id , ...data});
    })

 

    socket.on("disconnect", () => {
        //  remove user and broadcast updated list
        delete connectedUsers[socket.id];
        io.emit("user-disconnected", socket.id);
        io.emit("update-user-list", Object.values(connectedUsers));
        console.log("disconnected:", socket.id);
    });
    console.log("Connected");
});

app.use("/" , (req , res)=>{
    res.render("index");
});



server.listen(PORT , ()=>{
    console.log(`Server is Listening at Port : ${PORT}`);
})