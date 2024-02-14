const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:Number
 }

})

module.exports=mongoose.model('products',productsSchema)