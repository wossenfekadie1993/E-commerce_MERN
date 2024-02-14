const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:Number,
    required:true
 },
 name:{
    type:String,
    re
 }

})

module.exports=mongoose.model('products',productsSchema)