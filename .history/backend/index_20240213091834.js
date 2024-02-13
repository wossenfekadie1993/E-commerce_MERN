require('dotenv').config();
const express =require('express');
const mongoose=require('mongoose');
const app=express();

const port=process.env.PORT || 4000
const db_url=process.env.DB_URL
const jwt =require('jsonwebtoken');
const multer =require('multer');
const path=require('path');
const cors=require('cors');

app.use(express.json());


mongoose.connect(db_url);
const db=mongoose.connection;
db.on("error" ,(error) => console.log(error()))
db.once("open",()=>console.log("connection establish to database"));

app.listen(port,()=>console.log("app is running on port", port))