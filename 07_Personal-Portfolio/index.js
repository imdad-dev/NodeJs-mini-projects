import dotenv from  "dotenv"
import express from "express"

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs'); // Set EJS as template engine
app.use(express.static('public')); // Serve static files from public folder

app.get('/', (req, res) => { 
  res.render("home")
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});