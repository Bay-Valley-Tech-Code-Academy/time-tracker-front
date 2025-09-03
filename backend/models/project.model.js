const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    trackedHours: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Project', projectSchema);