const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app_config = require('../config/config')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [6, 'Password must be atleast 4 character long']
    },
    saltSecret: String,
    token: {
        type: String
    }
});


userSchema.path('email').validate((val) => {
        emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(val);
    },
    'Invalid e-mail.'
);
//

userSchema.pre('save', function(next) {
    //var user = this;
    //
    //if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.pre('search', (next) => {
    console.log('11');
    var user = this;
    user.findOne({ 'email': req.body.email }, function(err, user) {
        console.log('5');
        next();
        // if (!user) return res.json({ isAuth: false, message: ' Auth failed ,email not found' });
    })
});
userSchema.methods.comparepassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(next);
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), app_config.secret);

    user.token = token;
    user.save(function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

userSchema.methods.deleteToken = function(token, cb) {
    var user = this;

    user.update({ $unset: { token: 1 } }, function(err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    jwt.verify(token, app_config.secret, function(err, decode) {
        user.findOne({ "_id": decode, "token": token }, function(err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
};

module.exports = mongoose.model('User', userSchema);