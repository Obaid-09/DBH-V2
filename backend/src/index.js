import "./env.js";
// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
import connectDB from "./db/indexdb.js"
import express from "express";
import {app} from "./app.js"
import multer from "multer"

// console.log("PORT =", process.env.PORT);
// console.log("ACCESS_TOKEN_SECRET =", process.env.ACCESS_TOKEN_SECRET);
// console.log("REFRESH_TOKEN_SECRET =", process.env.REFRESH_TOKEN_SECRET);

app.get("/", (req, res) => {
  res.send("DBH V1")
})
connectDB()
.then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running at: , ${process.env.PORT}`)
  })
})
.catch((err) => {
  console.log("MONGODB connection failed", err);
})


