const mongoose = require('mongoose');

const productsSchema =mongoose.Schema({
 id:{
    type:String
 }

})

module.exports=mongoose.model('products',productsSchema)