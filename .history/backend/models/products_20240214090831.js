const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:Number,
    required:true
 },
 name:{
    type:String,
    required:true
 },
 image:{
    type:String,
    required:true
 },
 category:{

 },

})

module.exports=mongoose.model('products',productsSchema)