const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const VenueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true

    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    phone:{
      type: Number
    },
    email: {
        type: String,
        required: true
    }
});

const Venue = module.exports = mongoose.model('Venue', VenueSchema);


module.exports.addVenue = function(newVenue, callback){
    newVenue.save(callback);
};

module.exports.getVenueById = function(id, callback){
    Venue.findById(id, callback);
};

module.exports.FindVenueByIdAndDelete = function (id, callback) {
    Venue.findOneAndDelete(id,callback);
};

module.exports.FindVenueByIdAndUpdate = function (id, callback) {
    User.findOneAndUpdate(id, callback)
};