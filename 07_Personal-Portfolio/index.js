import dotenv from  "dotenv"
import app from "./app.js"
import connectMongoDB from "./DB/connectDB.js";

dotenv.config();


 
const port = process.env.PORT || 3000;

// mongo connect
connectMongoDB(process.env.MONGODB_URI);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});