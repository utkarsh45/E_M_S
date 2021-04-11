const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const cookies = require('cookie-parser');
// const dbo = require('./config/db');
const connectDB = require('../config/db');
const bcrypt = require('bcrypt');

router.post('/register', (req, res, next) => {
    console.log('start1');
    const user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.json(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
});

router.post('/login2', async(req, res) => {
    let result = false;

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://root:root@cluster0.hmopa.mongodb.net/Employee_Management_System?retryWrites=true&w=majority";

    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        var dbo = db.db("Employee_Management_System");
        await dbo.collection("users").findOne({ 'email': req.body.email }, function(err, user) {
            // if (!user) return res.json({ isAuth: false, message: ' Auth failed ,email not found' });
            // console.log(result);
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                console.log('pass check start ' + isMatch);
                result = isMatch;
                if (result) { res.json(user); } else { res.json(null); }
            });

            console.log(result);
            db.close();
        });

    });


});

// router.post('/login2', (req, res) => {
//     console.log('start');
//     if (user) {
//         return res.status(400).json({
//             error: true,
//             message: "You are already logged in"
//         });
//     } else {
//         console.log('start2');
//         

//             });
//             return true;
//         });
//     }

// });



router.post('/login', function(req, res) {
    debugger;
    let token = req.cookies.auth;
    user.findByToken(token, (err, user) => {
        debugger;
        if (err) return res(err);
        if (user) return res.status(400).json({
            error: true,
            message: "You are already logged in"
        });
        else {
            user.findOne({ 'email': req.body.email }, function(err, user) {
                if (!user) return res.json({ isAuth: false, message: ' Auth failed ,email not found' });

                user.comparepassword(req.body.password, (err, isMatch) => {
                    if (!isMatch) return res.json({ isAuth: false, message: "password doesn't match" });

                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie('auth', user.token).json({
                            isAuth: true,
                            id: user._id,
                            email: user.email
                        });
                    });
                });
            });
        }
    });
});

// get logged in user
router.get('/dashboard/id', auth, function(req, res) {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        fullName: req.user.fullName

    })
});


//logout user
router.get('/logout/id', auth, function(req, res) {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });

});

module.exports = router;