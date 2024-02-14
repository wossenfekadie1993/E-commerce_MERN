const Product = require('../models/products');
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const port=process.env.PORT || 4000

//http://localhost:3000/images/product_1707893836886.jpg

// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
// creating upload endpoint for images

router.use('/images', express.static(path.join(__dirname, 'upload/images')));
router.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

//add new product
router.post('/createProduct', async (req, res) => {
let products = await Product.find({});
let id;
if(products.length>0){
    let last_product_array=products.slice(-1);
    let last_product=last_product_array[0];
    id=last_product.id + 1;
}else{
    id=1
}
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        
    });
    try {
        let new_product = await product.save();
        res.status(200).send(new_product);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get all product
router.get('/getProducts', async (req, res) => {
    try{
        const product = await Product.find()
    res.status(200).json(product)
    }catch(err){
        res.status(500).json({message:err.message})
    }
});

//get one product
router.get('/:id', async (req, res) => {
    const {id} =req.params;
    try{
        const product= await Product.findById(id)
        if(!product){
            res.status(404).json({message:"product not"})
        }
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message:err.message})
    }

});

//update product
router.patch('/:id', async (req, res) => {
    // Update product logic here
    const {id}= req.params
    try{
    const updateProduct =await  Product.findByIdAndUpdate(id);
    if(!updateProduct){
        res.status(404).json({message:"product not found"})
    }
    res.status(201).json(updateProduct)
}catch(err){
    res.status(500).json({message:err.message})
}
});

// delete product
router.delete('/:id', async (req, res) => {
    // Delete product logic here
    let {id}=req.params;
    try{
        const removeProduct= await Product.findByIdAndDelete(id)
        if(!removeProdut){
            res.status(404).json( message:"product not found")
        }
    }catch(err){

    }
});
module.exports=router;