const express = require('express');
const User = require('../modules/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const axios = require('axios');
const config = require('../config');
const nanoid = require('nanoid');
const multer = require('multer');


const storage = config.storage;
const upload = multer({storage});


router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user)
});

router.post('/', upload.single('image'), async (req, res) => {
    const username = await User.findOne({username: req.body.username});
    if (username) {
        res.status(401).send({username: 'Такой пользователь существует'})
    } else {
        const mewUser = {
            username: req.body.username,
            password: req.body.password,
            fullName: req.body.fullName
        };
        if (req.file){
            mewUser.image = req.file.filename
        }
        const user = new User(mewUser);

        try {
            await user.generateToken();
            await user.save();
            res.send(user)
        } catch (e) {
            res.status(404).send({error: "not found"})
        }
    }
});


router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({username: 'Username not found '})
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({password: 'Password in correct'})
    }
    user.generateToken();
    await user.save();
    return res.send(user)
});

router.post('/facebook', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }
        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});
        if (!user) {
            const newUser = {
                fullName: req.body.name,
                username: req.body.id,
                password: nanoid(),
                facebookId: req.body.id
            };
            if (req.body.picture){
              newUser.image = req.body.picture.data.url
            }
            user = new User(newUser);
        }
        await user.generateToken();
        await user.save();
        res.send(user)
    } catch (e) {
        res.status(404).send({error: 'Not found!'})
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Bye'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);


    user.generateToken();
    await user.save();
    return res.send(success);
});

module.exports = router;