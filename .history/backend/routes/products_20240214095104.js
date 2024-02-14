const Product = require('../models/products');
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

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
//get all products
router.post('/', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date,
        available: req.body.available,
    });
    try {
        let new_product = await product.save();
        res.status(200).send(new_product);
        console.log(new_product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//add product
router.post('/add', async (req, res) => {
    // Add product logic here
});

//get one product
router.get('/:id', async (req, res) => {
    // Get one product logic here
});

//update product
router.put('/:id', async (req, res) => {
    // Update product logic here
});

// delete product
router.delete('/:id', async (req, res) => {
    // Delete product logic here
});
