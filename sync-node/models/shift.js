const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const ShiftSchema = mongoose.Schema({

    venue: {
        type: String,
        required: true

    },
     date: {
        type: Date
    },
    time: {
        type: String
    }
});

const Shift = module.exports = mongoose.model('Shift', ShiftSchema);


module.exports.addShift = function(newShift, callback){
    newShift.save(callback);
};

module.exports.getShiftbyId = function(id, callback){
    Shift.findById(id, callback);
};

module.exports.FindShiftByIdAndDelete = function (id, callback) {
    Shift.findOneAndDelete(id,callback);
};

module.exports.FindVenueByIdAndUpdate = function (id, callback) {
    User.findOneAndUpdate(id, callback)
};