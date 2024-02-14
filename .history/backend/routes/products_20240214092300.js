const Produc = require('./models/products');
const express =require('express');
const mongoose=require('mongoose');
const app=express();
const jwt =require('jsonwebtoken');
const multer =require('multer');
const path=require('path');
const cors=require('cors');
app.use(express.json());
app.use(cors());


// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
// creating upload endpoint for images
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
//get all products
app.post('./get',async(req,res)=>{

    const product= new Product
})
//add product
app.post('./createProduct',async(req,res)=>{

})

//get one product
app.post('./getProduct',async(req,res)=>{

})
//update product
app.post('./updateProduct',async(req,res)=>{

})
// delete product
app.post('./deleteProduct',async(req,res)=>{

})