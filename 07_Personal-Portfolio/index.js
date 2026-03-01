
import express from "express"
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as template engine
app.use(express.static('public')); // Serve static files from public folder

app.get('/', (req, res) => {
  res.send('Hello, Portfolio World!'); // Temporary home route
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});