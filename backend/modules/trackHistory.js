const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    trackId: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const TrackHistory = mongoose.model('TrackHistory', newSchema);

module.exports = TrackHistory;