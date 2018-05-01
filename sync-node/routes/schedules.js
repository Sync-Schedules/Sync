const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Schedule = require('../models/schedule');

// Register
router.post('/createSchedule', (req, res, next) => {
    let newSchedule = new Schedule({
        shift: req.body.shift,
        dj: req.body.dj
    });

    Schedule.addSchedule(newSchedule, (err, schedule) => {
        if(err){
            res.json({success: false, msg: 'Failed to Create Schedule'});
        } else {
            res.json({success: true, msg: 'Schedule Posted'});
        }
    });
});


//Get Schedule
router.get('/schedules', function(req, res) {
    Schedule.find(function (err, shifts) {
        if(err){
            console.log(err);
        }else{
            res.json(shifts);
        }
    });
});

//UPDATE Schedule BY ID

router.put('/update/:id', function (req, res) {
    console.log('updating schedule: ' + req.params.id, req.body);
    Schedule.findByIdAndUpdate(req.params.id, req.body, function (err, updatedSchedule) {
        if(err){
            res.json({
                success: false,
                msg: 'Failed'
            });
            console.log(err + res)
        }else{
            res.json({
                success: true,
                data: updatedSchedule,
                msg: 'Success!'
            });
            console.log('Updated Schedule: ' + updatedSchedule);
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

