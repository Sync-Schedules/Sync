const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Venue = require('../models/venue');

// new Venue
router.post('/addVenue', (req, res, next) => {
    let newVenue = new Venue({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email
    });

    Venue.addVenue(newVenue, (err, venue) => {
        if(err){
            res.json({success: false, msg: 'Failed to create venue'});
        } else {
            res.json({success: true, msg: 'Venue created'});
        }
    });
});


// Profile
router.get('/profile', (req, res, next) => {
    res.json({venue: req.venue});
});

//Get All

router.get('/venues', function(req, res) {
    Venue.find(function (err, venues) {
        if(err){
            res.json({success: false, msg: 'Failed to get Venues'});
            console.log(err);
        }else{
            res.json(venues);
        }
    });
});

//DELETE VENUE
router.delete('/venue/:id', function (req, res) {
    console.log('deleting venue...');
    Venue.findByIdAndRemove(req.params.id, function (err, deletedVenue) {
        if(err){
            res.send({
                success: false,
                msg: 'Failed'
            })
        }else {
            res.json({
                success: true,
                data: deletedVenue,
                msg: 'Success, '+ deletedVenue + 'has been deleted'
            });
        }
    });
});

//UPDATE VENUE


router.put('/update/:id', function (req, res) {
    console.log('updating venue: ' + req.params.id, req.body);
    Venue.findByIdAndUpdate(req.params.id, req.body, function (err, updatedVenue) {
        if(err){
            res.json({
                success: false,
                msg: 'Failed'
            });
            console.log(err + res)
        }else{
            res.json({
                success: true,
                data: updatedVenue,
                msg: 'Success!'
            });
            console.log('Updated Venue: ' + updatedVenue);
        }
    });
});



module.exports = router;

