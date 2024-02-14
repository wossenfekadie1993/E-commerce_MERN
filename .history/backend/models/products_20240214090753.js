const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:Number,
    required:true
 },
 name:{
    type:String
 }

})

module.exports=mongoose.model('products',productsSchema)