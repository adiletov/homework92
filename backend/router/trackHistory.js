const express = require('express');
const TrackHistory = require('../modules/trackHistory');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', auth, async (req, res) => {
    const user = req.user;
    const trackHistory = {
        userId: user._id,
        trackId: req.body.id,
        date: new Date()
    };

    const newTrackHistory = new TrackHistory(trackHistory);

    try {
        await newTrackHistory.save();
        res.send(newTrackHistory)
    } catch (e) {
        return res.status(404).send({error: 'not found'})
    }
});

router.get('/', async (req, res) => {
    const trackHistory = await TrackHistory.find().sort({date: -1}).populate({
        path: 'trackId',
        populate: {
            path: 'album',
            model: 'Album',
            populate: {
                path: 'artist',
                model: 'Artist'
            }
        },
    });
    res.send(trackHistory)
});

module.exports = router;