const mongoose = require('mongoose');


var createEmp = mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\. \S+/, 'is invalid'],
        index: true
    },
    mobile: {
        type: Number,
        max: 999999999,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        uppercase: true,
        required: true
    },
    course: {
        type: String,
        uppercase: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CreateEmployee', createEmp);