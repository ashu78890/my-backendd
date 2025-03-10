const mongoose = require('mongoose');

// Define a schema for the User model
const studentSchema = new mongoose.Schema({
id:{
    type:String
},
    name: {
        type: String,
        required: true,
    },
    rollNo: {
        type: Number,
        required: true,
        // unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    image:String
});

// Create a User model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
