require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDb');
const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes")
const statsRoutes = require("./routes/stats.routes")





const app  = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/stats", statsRoutes);



console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Connect to Database
connectDB();


app.get("/" , (req , res) => {
    res.send("hello welcome to Trello backend")
})


app.listen(5000 , () => {
    console .log("server is running on port 5000")
}) 
