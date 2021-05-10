const express = require('express');
const router = express.Router();    
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

// Load user model
const User = require('../../models/User');


// @route  GET api/users/test
// @desc test users route
//@access public
router.get('/test', (req,res) => {
    res.json({msg : 'user found'})
});

// @route  GET api/users/register
// @desc Register user
//@access public
router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exist'});
        }
        else {

            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //default 
            });
            const newUser =  new User({
                name : req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt ,(err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            });


        }
    });
});

// @route  GET api/users/login
// @desc Login user //returning JWT token
//@access public
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({email})
    .then(user => {
        //  check for user
        if(!user)
        {
            res.status(404).res.json({email: 'User not found'});
        }
    })
});

module.exports = router;