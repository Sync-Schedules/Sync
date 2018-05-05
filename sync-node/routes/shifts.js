const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Shift = require('../models/shift');

// Register
router.post('/createshift', (req, res, next) => {
    let newShift = new Shift({
        venue: req.body.venue,
        date: req.body.date,
        time: req.body.time,
        dj: req.body.dj
    });

    Shift.addShift(newShift, (err, shift) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'Shift registered'});
        }
    });
});




//Get All shifts
router.get('/shifts', function(req, res) {
    Shift.find(function (err, shifts) {
        if(err){
            console.log(err);
        }else{
            res.json(shifts);
        }
    });
});



//DELETE shift BY ID
router.delete('/delete/:id', function (req, res) {
    console.log('deleting shift...');
    Shift.findByIdAndRemove(req.params.id, function (err, deletedShift) {
        if(err){
            res.send({
                success: false,
                msg: 'Failed'
            })
        }else {
            res.json({
                success: true,
                data: deletedShift,
                msg: 'Success!'
            });
        }
    });
});

//UPDATE shift BY ID

router.put('/update/:id', function (req, res) {
    console.log('updating user: ' + req.params.id, req.body);
    Shift.findByIdAndUpdate(req.params.id, req.body, function (err, updatedShift) {
        if(err){
            res.json({
                success: false,
                msg: 'Failed'
            });
            console.log(err + res)
        }else{
            res.json({
                success: true,
                data: updatedShift,
                msg: 'Success!'
            });
            console.log('Updated Shift: ' + updatedShift);
        }
    });
});


//POST SCHEDULE
//
// router.post('/addShift', function (req, res) {
//     console.log('Adding Shift: ' + req.params.id, req.body);
//     User.findByIdAndUpdate(req.params.id, req.body, function (err, addedShift) {
//         if(err){
//             res.json({success: false, msg: 'Failed'});
//         } else{
//             res.json({success: true, data: addedShift, msg: 'Success!'});
//             console.log('Shift added: ' + addedShift);
//         }
//     });
// });
//
//
// // GET SCHEDULE
//
// router.get('/getShifts', function(req, res) {
//     console.log('req: ' + req + 'res: '+ res);
//     User.find(function (err, shift){
//         if(err){
//             console.log(err);
//         } else{
//             res.json(shift);
//         }
//     });
// });

module.exports = router;

