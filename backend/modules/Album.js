const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    yearOfIssue: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    published: {
        type: Boolean,
        required: true
    }

});

const Album = mongoose.model('Album', newSchema);

module.exports = Album;