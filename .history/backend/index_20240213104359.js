require('dotenv').config();
const express =require('express');
const mongoose=require('mongoose');
const app=express();
const port=process.env.PORT || 4000
const db_url=process.env.DB_URL
const jwt =require('jsonwebtoken');
const multer =require('multer');
// const path=require('path');
const cors=require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(db_url);
const db=mongoose.connection;
db.on("error" ,(error) => console.log(error()))
db.once("open",()=>console.log("connection establish to database"));


// get all
app.get("/new",(req,res)=>{
    res.json("express is running")   
})
// get one
//create
//update 
// delete
// image storage engine
const storage =multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
       return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)})`);
    }
})
// 
const upload=multer({storage:storage})
// creating upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/req`
    })
})


app.listen(port,(error)=>{
if(!error){
    console.log("app is running on port", port)}
    else{
        console.log(error)
    }
})