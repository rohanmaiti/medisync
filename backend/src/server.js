const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const connectDB = require("./lib/db.js");
const userRoutes =require("../src/routes/auth.route.js")

const app = express();
const PORT = process.env.PORT || 6000;

app.listen(PORT, (err)=>{
err ? console.log("err", err.message) : console.log(`Server is running on port ${PORT}`);
connectDB().then(()=>console.log("Connected to DB"))
.catch((err)=>console.log("DB Connection Error", err.message));
})


const authRoutes = require("./routes/auth.route.js");
const User = require("./models/user.model.js");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


app.use("/api",userRoutes);
