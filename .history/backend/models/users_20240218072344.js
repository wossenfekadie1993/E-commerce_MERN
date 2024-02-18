const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    trim: true,
  },
  username: {
    require: true,
    type: String,
    trim: true,
  },
  email: {
    require: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
      const RegEx= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(RegEx);
      },
      massage: "please enter a valid email address",
    },
  },
  password: {
    require: true,
    type: String,
  },
  address: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    require:true,
    default: "user",
  },
});
const User = mongoose.model("User", userSchema);
module.exports=User;