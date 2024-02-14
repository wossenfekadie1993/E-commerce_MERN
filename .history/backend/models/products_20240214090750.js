const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:Number,
    required:true
 },
 name:{
    type:
 }

})

module.exports=mongoose.model('products',productsSchema)