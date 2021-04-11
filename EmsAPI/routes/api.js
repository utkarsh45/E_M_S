const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const cookies = require('cookie-parser');



router.get('/register', async(req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.send('Error')
    }
})

router.post('/register', (req, res, next) => {

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
router.post('/login', function(req, res) {
    let token = req.cookies.auth;
    user.findByToken(token, (err, user) => {
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
router.get('/dashboard', auth, function(req, res) {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        fullName: req.user.fullName

    })
});


//logout user
router.get('/logout', auth, function(req, res) {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });

});

module.exports = router;