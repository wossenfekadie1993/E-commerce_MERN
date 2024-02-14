const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:Number,
    required
 }

})

module.exports=mongoose.model('products',productsSchema)