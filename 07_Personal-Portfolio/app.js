import express from "express"


import Project from "./models/project.model.js";

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.urlencoded({extended :true}))

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
   
    description : "This is test portfolio project" ,
    link : "http://imdad-dev/portfolio"

  });
  console.log("prject: " , project);

  res.send(" created project model on mongoDB")

})   

app.get("/project" , async (req , res)=>{

  const projects = await Project.find ();  // fetch all projectc
  console.log(projects)
  res.render("project" , { 
    projects 
  })

})


app.get("/skills" , (req , res)=>{
    res.render("skills")
})

app.get("/contact" , (req , res)=>{
    res.render("contact")
})


export default app;