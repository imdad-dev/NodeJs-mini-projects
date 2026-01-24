const http = require('http');
const fs = require('fs');

const port = 3000;

   const server = http.createServer( (req,res)=>{

    res.writeHead(200 , {"content-type": "text/html"});
    res.end("Hello from our own server X powerd by NodeJs");

   })

server.listen(port ,()=>{
    console.log(`Server is listening on port: ${port}`);
})