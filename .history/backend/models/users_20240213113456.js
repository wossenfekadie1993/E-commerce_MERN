const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    registrationDate:{
        type: Date,
        default: Date.now()
    }

})

module.exports= mongoose.model('userModel')