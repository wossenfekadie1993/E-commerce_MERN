require('dotenv').config();
const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const flash = require('express-flash')
const port=process.env.PORT || 4000
const db_url=process.env.DB_URL
// const jwt =require('jsonwebtoken');
// const multer =require('multer');
// const path=require('path');

const app=express();
app.use(express.json());
app.use(cors());
app.set('view-engine','ejs')
app.use(flash())

mongoose.connect(db_url);
const db=mongoose.connection;
db.on("error" ,(error) => console.log(error()))
db.once("open",()=>console.log("connection establish to database"));

// home page
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })

  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
app.get('/login', (req,res)=>{
    res.render('login.ejs');
})
//user route
const user=require('./routes/users')
app.use('/user', user)

//product route
const product =require('./routes/products')
app.use('/product',product)

//listening on given port
app.listen(port,(error)=>{
if(!error){
    console.log("app is running on port", port)}
    else{
        console.log(error)
    }
})