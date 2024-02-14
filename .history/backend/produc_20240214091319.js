const Produc = require('./models/products');
const express =require('express');
const mongoose=require('mongoose');
const app=express();
const jwt =require('jsonwebtoken');
const multer =require('multer');
const path=require('path');
const cors=require('cors');
