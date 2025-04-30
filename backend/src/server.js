import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, (err) => {
  connectDB().then(()=>{
    console.log("connected to DB")
  }).catch(err=>{
    console.log("Error connecting to DB",err.message);
  })  
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


import hospitalRoutes from "./routes/hospital.route.js";
import authRoutes from "./routes/auth.route.js";
app.use("/api/hospital", hospitalRoutes);
app.use("/api/auth", authRoutes);
