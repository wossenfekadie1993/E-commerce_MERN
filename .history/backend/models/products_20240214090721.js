const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:Number,
    req
 }

})

module.exports=mongoose.model('products',productsSchema)