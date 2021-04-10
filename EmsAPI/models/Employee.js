const mongoose = require('mongoose');


var employee = mongoose.Schema({
    emp_id: {
        type: String,
        required: true
    },
    emp_name: {
        type: String,
        uppercase: true,
        required: true
    },
    emp_email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    emp_mobile: {
        type: Number,
        max: 999999999,
        unique: true
    },
    emp_image: {
        type: String,
        required: true
    },
    emp_designation: {
        type: String,
        required: true
    },
    emp_gender: {
        type: String,
        uppercase: true,
        required: true
    },
    emp_course: {
        type: String,
        uppercase: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', employee);