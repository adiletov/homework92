const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config');
const Artist = require('../modules/Artist');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = config.storage;
const upload = multer({storage});




router.get('/', async (req, res) => {
    const artists = await Artist.find({}, {description: false});
    res.send(artists)
});

router.get('/:id', async (req, res) => {
    const artist = await Artist.findOne({_id: req.params.id});
    res.send(artist)
});

router.post('/', upload.single('image'), async (req, res) => {
    const newArtist = {
        name: req.body.name,
        description: req.body.description,
        published: false
    };
    if (req.file) {
        newArtist.image = req.file.filename
    }

    const artist = new Artist(newArtist);

    try {
        await artist.save();
        res.send(artist._id)
    } catch (e) {
        res.status(404).send({message: 'Not found'})
    }
});

router.post('/:id/publish',[auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findOne({_id: req.params.id});
        if(!artist) {
            return res.sendStatus(404);
        }

        artist.published = !artist.published;
        await artist.save();

        return res.send(artist);
    } catch {
        return res.sendStatus(400);
    }
});


router.delete('/:id',[auth, permit('admin')], async (req, res) => {
    await Artist.deleteOne({_id: req.params.id});
    res.send('Delete')
});

module.exports = router;