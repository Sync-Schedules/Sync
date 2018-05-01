const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        last: req.body.last,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
            monday: req.body.monday,
            tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday

    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});


//Get All Users
router.get('/users', function(req, res) {
    User.find(function (err, users) {
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});

//Get DJs only
router.get('/djs', function(req, res) {
    User.find({role: 'DJ'}, function (err, role){
    if(err){
        console.log(err);
    } else{
        res.json(role);
    }
    });
});

//DELETE USER BY ID
router.delete('/user/:id', function (req, res) {
    console.log('deleting user...');
    User.findByIdAndRemove(req.params.id, function (err, deletedUser) {
        if(err){
            res.send({
                success: false,
                msg: 'Failed'
            })
        }else {
            res.json({
                success: true,
                data: deletedUser,
                msg: 'Success!'
            });
        }
    });
});

//UPDATE USER BY ID

router.put('/update/:id', function (req, res) {
    console.log('updating user: ' + req.params.id, req.body);
    User.findByIdAndUpdate(req.params.id, req.body, function (err, updatedUser) {
        if(err){
            res.json({
                success: false,
                msg: 'Failed'
            });
            console.log('ERROR ' + err + res)
        }else{
            res.json({
                success: true,
                data: updatedUser,
                msg: 'Success!'
            });
            console.log('Updated User: ' + updatedUser);
        }
    });
});


//POST SCHEDULE

router.post('/addShift', function (req, res) {
   console.log('Adding Shift: ' + req.params.id, req.body);
   User.findByIdAndUpdate(req.params.id, req.body, function (err, addedShift) {
       if(err){
           res.json({success: false, msg: 'Failed'});
       } else{
           res.json({success: true, data: addedShift, msg: 'Success!'});
           console.log('Shift added: ' + addedShift);
       }
   });
});


// GET SCHEDULE

router.get('/getShifts', function(req, res) {
    console.log('req: ' + req + 'res: '+ res);
   User.find(function (err, shift){
        if(err){
            console.log(err);
        } else{
            res.json(shift);
        }
    });
});

module.exports = router;

