const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Schedule Schema
const ScheduleSchema = mongoose.Schema({

    shift: {
        type: String,
        required: true

    },
    dj: {
        type: String,
        required: true
    }
});

const Schedule = module.exports = mongoose.model('Schedule', ScheduleSchema);


module.exports.addSchedule = function(newSchedule, callback){
    newSchedule.save(callback);
};


module.exports.FindScheduleByIdAndUpdate = function (id, callback) {
    User.findOneAndUpdate(id, callback)
};