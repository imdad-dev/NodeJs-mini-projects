const http = require('http');
const fs = require('fs');
const path = require('path');
const Stream = require('stream');

const  PORT =3000;

   const server = http.createServer( (req,res)=>{
    const url = req.url ==="/" ?"index.html ": req.url
    const filePath = path.join(__dirname ,  url.trim() )
    const extname = String(path.extname(filePath)).toLowerCase();

    const mimeTypes = {
        ".html" : "text/html" ,
        ".css" : "text/css" ,
        ".js" : "text/javascript" ,
        ".png" : "image/png" ,
        ".pdf" : "application/pdf" ,
    }
    const contentType = mimeTypes[extname ]|| "application/octet-Stream";

    // read and serve 
    fs.readFile(filePath , (err,data)=>{
        if(err) {
        if(err.code ==='ENOENT') {
            res.writeHead( 404 , { "content-type" : "text/html"});
            res.end(`<h1 style="color:red; text-align:center ;">Page Not Found!</h1>`);
        }

     }      else {
      res.writeHead(200 , { "content-type" : contentType});
            res.end(data ,"utf-8");
        }
    })

   })

server.listen(PORT ,()=>{
    console.log(`Server is listening on port: ${PORT}`);
})