const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        required: true,
        type: Number,
    },
    launchDate: {
        required: true,
        type: Date,
    },
    target: {
        type: String,
    },
    rocket: {
        required: true,
        type: String,
    },
    mission: {
        required: true,
        type: String,
    },
    customers: {
        required: true,
        type: [String],
    },
    success: {
        required: true,
        type: Boolean,
    },
    upcoming: {
        required: true,
        type: Boolean,
    }
});

module.exports = mongoose.model('Launches', launchesSchema);