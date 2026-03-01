import dotenv from  "dotenv"
import express from "express"
import connectMongoDB from "./DB/connectDB.js";
import Project from "./models/project.model.js";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

// mongo connect
connectMongoDB(process.env.MONGODB_URI);

app.set('view engine', 'ejs'); // Set EJS as template engine
app.use(express.static('public')); // Serve static files from public folder

app.get('/', (req, res) => { 
  res.render("home")
});

app.get('/about', (req, res) => { 
  res.render("about")
});


app.get("/test-db" , async (req, res)=>{

  const project =  await Project.create(  {
    title : "Test title project" ,
    coverImage : "/public/images/prject-1" ,
    description : "This is test portfolio project" ,
    link : "http://imdad-dev/portfolio"

  });
  console.log("prject: " , project);

  res.send(" created project model on mongoDB")

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});