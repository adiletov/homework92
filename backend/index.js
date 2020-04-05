const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

const artists = require('./router/atrists');
const albums = require('./router/albums');
const tracks = require('./router/tracks');
const users = require('./router/users');
const track_history = require('./router/trackHistory');

const config = require('./config');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


const run = async () => {
    await mongoose.connect(config.database, config.options);
    app.use('/artists', artists);
    app.use('/albums', albums);
    app.use('/tracks', tracks);
    app.use('/users', users);
    app.use('/track_history', track_history);

    app.listen(port);
};


run().catch(e => {
    console.error(e)
});