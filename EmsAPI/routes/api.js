const express = require('express');
const router = express.Router();
const jwtHelp = require('../config/jwtHelp');
const User = require('../models/User');
const passport = require('passport');
const _ = require('lodash');

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
})



router.post('/authenticate', async(req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(404).json(err);
        // registered user
        if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
})


router.post('/dashboard', async(req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
        }
    );
})

module.exports = router;