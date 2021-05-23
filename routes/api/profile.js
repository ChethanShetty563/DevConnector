const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');

// Load models
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route  GET api/profile/test
// @desc test profile route
//@access public
router.get('/test',passport.authenticate('jwt', {session: false}) ,(req,res) => {
    res.json({user : req.user});
});

// @route  GET api/profile/
// @desc get current user profile
//@access public
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile)
        {
            errors.noprofile = 'There is no profile';
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));

});


// @route  POST api/profile/
// @desc create  user profile
//@access public
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const profilefields = {};
    profilefields.user = req.user.id;
    if(req.body.handle) profilefields.handle = req.body.handle;
    if(req.body.company) profilefields.company = req.body.company;
    if(req.body.website) profilefields.website = req.body.website;
    if(req.body.location) profilefields.location = req.body.location;
    if(req.body.bio) profilefields.bio = req.body.bio;
    if(req.body.githubusername) profilefields.githubusername = req.body.githubusername;

    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined'){
        profilefields.skills = req.body.skills;
    } 

    // Social
    profilefields.social = {};
    if(req.body.youtube) profilefields.social.youtube = req.body.youtube;
    if(req.body.twitter) profilefields.social.twitter = req.body.twitter;
    if(req.body.facebook) profilefields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profilefields.social.instagram = req.body.instagram;
   


   Profile.findOne({user: req.user.id})
   .then(profile => {
       if(profile) {
        //    update
        Profile.findByIdAndUpdate(
            {user: req.user.id},
             {$set : profilefields}, 
             {new: true})
             .then(profile => {
                 res.json(profile);
             });

       }
       else {
        //    create
        Profile.findOne({handle: profilefields.handle})
        .then(profile => {
            if(profile){
                errors.handle = 'That handle already exists';
                res.status(400).json(errors);
            }

            // create
            new Profile(profilefields).save()
            .then(profile => {
                return res.json(profile);
            })
        })
       }
   })

});



module.exports = router;