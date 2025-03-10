const mongoose = require("mongoose")

const signUpschema = new mongoose.Schema({
    username:String,
    password:String,
    mobile:Number,
    email:String
})

module.exports = mongoose.model('signup',signUpschema)