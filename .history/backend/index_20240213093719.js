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
app.use(cors);

mongoose.connect('mongodb://localhost:27017');
const db=mongoose.connection;
db.on("error" ,(error) => console.log(error()))
db.once("open",()=>console.log("connection establish to database"));


// get all
app.get("/",(req,res)=>{
    res.json("express is running")
    console.log("connncen")
})
// get one
//create
//update 
// delete

app.listen(3000,(error)=>{
if(!error){
    console.log("app is running on port", port)}
    else{
        console.log(error)
    }
})