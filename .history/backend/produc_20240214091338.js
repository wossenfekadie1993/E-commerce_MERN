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
