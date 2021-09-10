const express = require('express');
const router = express.Router();
const User = require('../models/User');
// const bcrypt = require('bcrypt');
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken');


router.post('/register', (req, res, next) => {

    User.find({
        email: req.body.email
    }).exec(function (err, user) {
        if (err) {
            return next(err)
        }

        if (user.length) {
            return next({
                msg: 'User already present'
            })
        }
        let newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: passwordHash.generate(req.body.password)
        });
        newUser.save()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                return next(err)
            })

    })
})

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return next({ msg: 'User not Found' })
            }
            // check password
            let isMatch = passwordHash.verify(req.body.password, user.password)

            if (isMatch) {
                // res.json('success');
                const payload = { id: user.id, name: user.name }
                jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 360 }, (err, token) => {
                    res.json({
                        success: true,
                        token: token
                    })
                })

            } else {
                res.status(400).json({ password: 'Password is Incorrect' })
            }

        })
})

router.get('/', (req, res, next) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => next(err))
})

module.exports = router;